import { prisma } from "@/lib/prisma";
import { Medicine, Prisma } from "@prisma/client";
import { CreateMedicineInput, UpdateMedicineInput } from "@/types/medicine";

export async function createMedicine(
  data: CreateMedicineInput,
): Promise<Medicine> {
  return prisma.medicine.create({
    data: data as Prisma.MedicineCreateInput,
  });
}

export async function getMedicines(): Promise<Medicine[]> {
  return await prisma.medicine.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getMedicineById(id: number): Promise<Medicine | null> {
  return prisma.medicine.findUnique({
    where: {
      id,
    },
  });
}

export async function updateMedicine(
  id: number,
  data: UpdateMedicineInput,
): Promise<Medicine> {
  return prisma.medicine.update({
    where: {
      id,
    },
    data: data as Prisma.MedicineUpdateInput,
  });
}

export async function deleteMedicine(id: number): Promise<Medicine> {
  return prisma.medicine.delete({
    where: {
      id,
    },
  });
}

export async function getAllMedicines() {
  return await prisma.medicine.findMany({
    orderBy: {
      name: "asc",
    },
  });
}
export async function getMedById(medId: number) {
  return await prisma.inventory.findMany({
    where: {
      medicine: {
        id: medId,
      },
    },
    include: {
      medicine: true,
      pharmacy: true,
    },
  });
}
