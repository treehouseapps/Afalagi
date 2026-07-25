import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function getPharmacyDashboardData(userId: number) {
  const pharmacy = await prisma.pharmacy.findFirst({
    where: {
      ownerId: userId,
    },
    include: {
      inventory: {
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          medicine: true,
        },
      },
    },
  });

  if (!pharmacy) {
    throw new Error("Pharmacy not found");
  }
  const totalMedicines = await prisma.inventory.count({
    where: {
      pharmacyId: pharmacy.id,
    },
  });

  return {
    pharmacyStatus: pharmacy.approved ? "Approved" : "Pending Approval",

    totalMedicines,

    medicines: pharmacy.inventory.map((item) => ({
      id: item.id,
      medicineId: item.medicineId,

      name: item.medicine.name,
      category: item.medicine.category,
      manufacturer: item.medicine.manufacturer,

      quantity: item.quantity,
      price: item.price,
      expiryDate: item.expiryDate,
    })),
  };
}
export async function getPharmacyProfile() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  const pharmacy = await prisma.pharmacy.findFirst({
    where: {
      ownerId: Number(user.id),
    },
    include: {
      owner: true,
    },
  });

  if (!pharmacy) {
    throw new Error("Pharmacy not found");
  }

  return {
    name: pharmacy.name,
    phone: pharmacy.phone || "",
    email: pharmacy.owner.email,
    city: pharmacy.city,
    ownerName: pharmacy.owner.name,
    address: pharmacy.address,
    approved: pharmacy.approved,
  };
}
export async function updatePharmacyProfile(data: {
  name: string;
  address: string;
  city: string;
  phone: string;
}) {
  const user = await getCurrentUser();

  if (!user) {
    return { ok: false };
  }

  const pharmacy = await prisma.pharmacy.findFirst({
    where: {
      ownerId: Number(user.id),
    },
  });

  if (!pharmacy) {
    return { ok: false };
  }

  await prisma.pharmacy.update({
    where: {
      id: pharmacy.id,
    },
    data,
  });

  return { ok: true };
}
export async function getPharmacyById(pharmId: number) {
  const pharmacy = await prisma.inventory.findMany({
    where: {
      medicineId: Number(pharmId),
    },
    include: {
      pharmacy: true,
    },
  });
  if (!pharmacy) {
    throw new Error("Pharmacy not found");
  }

  return {
    pharmacy,
  };
}
export async function getAllPharmacy() {
  const pharmacyList = await prisma.pharmacy.findMany();

  if (!pharmacyList) {
    throw new Error("Pharmacy not found");
  }

  return pharmacyList;
}
export async function getPharmacyResult(pharmId: number) {
  const pharmacy = await prisma.pharmacy.findFirst({
    where: {
      id: pharmId,
    },
  });

  if (!pharmacy) {
    throw new Error("Pharmacy not found");
  }

  return pharmacy;
}
