"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { getPharmacyDashboardData } from "@/services/pharmacy.service";
import { getCurrentUser } from "@/lib/auth";
import { getPharmacyProfile } from "@/services/pharmacy.service";

export async function CreatePharmacy(
  userName: string,
  pharmacyName: string,
  pharmAddress: string,
  city: string,
  phone: string,
  email: string,
  password: string,
  cpassword: string,
) {
  const credentials = z
    .object({
      userName: z.string().min(2),
      pharmacyName: z.string().min(2),
      pharmAddress: z.string().min(2),
      city: z.string().min(2),
      phone: z.string().min(5),
      email: z.string().email(),
      password: z.string().min(6),
      cpassword: z.string().min(6),
    })
    .safeParse({
      userName,
      pharmacyName,
      pharmAddress,
      city,
      phone,
      email,
      password,
      cpassword,
    });

  if (!credentials.success) {
    return { ok: false, error: "Invalid input." };
  }

  if (password !== cpassword) {
    return { ok: false, error: "Passwords do not match." };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { ok: false, error: "Email already exists." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name: userName,
      email,
      password: hashedPassword,
      role: "PHARMACIST",
      phone,
    },
  });

  await prisma.pharmacy.create({
    data: {
      ownerId: user.id,
      name: pharmacyName,
      address: pharmAddress,
      city,
      phone,
    },
  });

  const token = await createToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
  });

  return { ok: true };
}
export async function getMyProfile() {
  const user = await getCurrentUser();

  if (!user) return null;

  const pharmacy = await prisma.pharmacy.findFirst({
    where: {
      ownerId: Number(user.id),
    },
    include: {
      owner: true,
    },
  });

  if (!pharmacy) return null;

  return {
    id: pharmacy.id,

    name: pharmacy.name,
    address: pharmacy.address,
    city: pharmacy.city,
    phone: pharmacy.phone ?? "",

    ownerName: pharmacy.owner.name,
    email: pharmacy.owner.email,

    approved: pharmacy.approved,
  };
}

export async function getMyPharmacyProfile() {
  return await getPharmacyProfile();
}
export async function updateMyProfile(data: {
  name: string;
  address: string;
  city: string;
  phone: string;
}) {
  const user = await getCurrentUser();

  if (!user) {
    return {
      ok: false,
    };
  }

  const pharmacy = await prisma.pharmacy.findFirst({
    where: {
      ownerId: Number(user.id),
    },
  });

  if (!pharmacy) {
    return {
      ok: false,
    };
  }

  await prisma.pharmacy.update({
    where: {
      id: pharmacy.id,
    },
    data: {
      name: data.name,
      address: data.address,
      city: data.city,
      phone: data.phone,
    },
  });

  return {
    ok: true,
  };
}
export async function getPharmacyDashboard() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return await getPharmacyDashboardData(user.id);
}

export async function getMyInventory() {
  const user = await getCurrentUser();

  if (!user) {
    return [];
  }

  const pharmacy = await prisma.pharmacy.findFirst({
    where: {
      ownerId: Number(user.id),
    },
  });

  if (!pharmacy) {
    return [];
  }

  const inventory = await prisma.inventory.findMany({
    where: {
      pharmacyId: pharmacy.id,
    },
    include: {
      medicine: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return inventory.map((item) => ({
    id: item.medicine.id,
    name: item.medicine.name,
    category: item.medicine.category,
    manufacturer: item.medicine.manufacturer,
    available: item.quantity > 0,
  }));
}
