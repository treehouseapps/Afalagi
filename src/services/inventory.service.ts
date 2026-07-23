import { prisma } from "@/lib/prisma";

export async function getPharmacyInventory(pharmacyId: number) {
  return await prisma.inventory.findMany({
    where: {
      pharmacyId,
    },
    include: {
      medicine: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function addInventory(data: {
  pharmacyId: number;
  medicineId: number;
  quantity: number;
  price?: number;
  expiryDate?: Date;
}) {
  return await prisma.inventory.create({
    data,
  });
}

export async function updateInventory(
  id: number,
  data: {
    quantity?: number;
    price?: number;
    expiryDate?: Date;
  },
) {
  return await prisma.inventory.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteInventory(id: number) {
  return await prisma.inventory.delete({
    where: {
      id,
    },
  });
}

export async function addMedicineToPharm(medicineId: number, userId: number) {
  const pharmacy = await prisma.pharmacy.findFirst({
    where: {
      ownerId: userId,
    },
  });

  if (!pharmacy) {
    throw new Error("Pharmacy not found");
  }

  const existing = await prisma.inventory.findFirst({
    where: {
      pharmacyId: pharmacy.id,
      medicineId,
    },
  });

  if (existing) {
    return {
      success: false,
      message: "Medicine already added",
    };
  }

  await prisma.inventory.create({
    data: {
      pharmacyId: pharmacy.id,
      medicineId,
      quantity: 0,
    },
  });

  return {
    success: true,
    message: "Medicine added",
  };
}

export async function removeMedicineFromPharmacy(inventoryId: number) {
  console.log("invvvvvvvvvvvvv ", inventoryId);
  const inventory = await prisma.inventory.findUnique({
    where: {
      id: inventoryId,
    },
  });

  if (!inventory) {
    throw new Error("Medicine not found in pharmacy");
  }

  await prisma.inventory.delete({
    where: {
      id: inventoryId,
    },
  });

  return {
    success: true,
    message: "Medicine removed",
  };
}
