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
