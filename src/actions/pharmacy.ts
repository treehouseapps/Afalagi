"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getDbErrorMessage } from "@/lib/utils";
import {
  getPharmacyDashboardData,
  getPharmacyProfile,
  updatePharmacyProfile,
  getPharmacyById,
  getAllPharmacy,
  getPharmacyResult,
  updatePharmacyById,
  deletePharmacyById,
} from "@/services/pharmacy.service";
import cloudinary from "@/lib/cloudinary";

export async function CreatePharmacy(
  userName: string,
  pharmacyName: string,
  pharmAddress: string,
  city: string,
  phone: string,
  email: string,
  password: string,
  cpassword: string,
): Promise<{ ok: boolean; error?: string }> {
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
    return { ok: false, error: "Invalid registration input." };
  }

  if (password !== cpassword) {
    return { ok: false, error: "Passwords do not match." };
  }

  try {
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
  } catch (error) {
    return { ok: false, error: getDbErrorMessage(error) };
  }
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
  const result = await updatePharmacyProfile(data);

  return result;
}
export async function getPharmacyDashboard() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    return await getPharmacyDashboardData(user.id);
  } catch (error) {
    return {
      pharmacyStatus: "Unavailable",
      totalMedicines: 0,
      medicines: [],
      error: getDbErrorMessage(error),
    };
  }
}

export async function getMyInventory() {
  const user = await getCurrentUser();

  if (!user) {
    return {
      pharmacyStatus: "No User",
      totalMedicines: 0,
      medicines: [],
    };
  }

  try {
    const pharmacy = await prisma.pharmacy.findFirst({
      where: {
        ownerId: Number(user.id),
      },
    });

    if (!pharmacy) {
      return {
        pharmacyStatus: "No Pharmacy",
        totalMedicines: 0,
        medicines: [],
      };
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

    return {
      pharmacyStatus: pharmacy.approved ? "Approved" : "Pending Approval",
      totalMedicines: inventory.length,
      medicines: inventory.map((item) => ({
        id: item.id,
        medicineId: item.medicine.id,
        name: item.medicine.name,
        category: item.medicine.category,
        manufacturer: item.medicine.manufacturer,
        quantity: item.quantity,
        price: item.price,
        expiryDate: item.expiryDate,
      })),
    };
  } catch (error) {
    return {
      pharmacyStatus: "Unavailable",
      totalMedicines: 0,
      medicines: [],
      error: getDbErrorMessage(error),
    };
  }
}

export async function getPharmacyList(pharmId: number) {
  return await getPharmacyById(Number(pharmId));
}

export async function updatePharmacyAction(formData: FormData) {
  const id = Number(formData.get("id"));
  const approvedValue = formData.get("approved");
  const approved =
    approvedValue === "true" ? true : approvedValue === "false" ? false : null;

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("A valid pharmacy id is required.");
  }

  if (approved !== null) {
    await prisma.pharmacy.update({
      where: { id },
      data: { approved },
    });
  }

  revalidatePath("/admin/pharmacies");
  revalidatePath("/admin/verify");
}

export async function deletePharmacyAction(id: number) {
  await deletePharmacyById(id);
  revalidatePath("/admin/pharmacies");
}

export async function getPharmacy() {
  return await getAllPharmacy();
}

export async function getPharmacyId(pharmId: number) {
  return await getPharmacyResult(Number(pharmId));
}

export async function approvePharmacyAction(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || id <= 0) {
    return;
  }

  await prisma.pharmacy.update({
    where: {
      id,
    },
    data: {
      approved: true,
      documentStatus: "APPROVED",
      rejectionReason: null,
    },
  });

  revalidatePath("/admin/verify");
  revalidatePath(`/admin/verify/${id}`);
  revalidatePath("/pharmacy/profile");

  redirect("/admin/verify");
}

export async function rejectPharmacyAction(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || id <= 0) {
    return;
  }

  await prisma.pharmacy.update({
    where: { id },
    data: { approved: false },
  });

  revalidatePath("/admin/verify");
  redirect("/admin/verify");
}

export async function uploadPharmacyDocument(
  formData: FormData,
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  try {
    // Get currently logged-in pharmacist
    const user = await getCurrentUser();

    if (!user) {
      return {
        ok: false,
        error: "Unauthorized.",
      };
    }

    // Find the pharmacy owned by this user
    const pharmacy = await prisma.pharmacy.findFirst({
      where: {
        ownerId: Number(user.id),
      },
    });

    if (!pharmacy) {
      return {
        ok: false,
        error: "Pharmacy not found.",
      };
    }

    const file = formData.get("document");

    if (!(file instanceof File)) {
      return {
        ok: false,
        error: "No document selected.",
      };
    }

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      return {
        ok: false,
        error: "Please upload a JPG or PNG image.",
      };
    }

    if (file.size > 5 * 1024 * 1024) {
      return {
        ok: false,
        error: "Document must be smaller than 5MB.",
      };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<{ secure_url: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "afalagi/pharmacy-documents",
              resource_type: "image",
            },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result as { secure_url: string });
              }
            },
          )
          .end(buffer);
      },
    );

    await prisma.pharmacy.update({
      where: {
        id: pharmacy.id,
      },
      data: {
        documentUrl: result.secure_url,
        documentStatus: "PENDING",
        rejectionReason: null,
        approved: false,
      },
    });

    revalidatePath("/pharmacy/profile");
    revalidatePath("/pharmacy");

    return {
      ok: true,
      url: result.secure_url,
    };
  } catch (error) {
    console.error("Document upload error:", error);

    return {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown upload error.",
    };
  }
}
