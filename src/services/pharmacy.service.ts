import { prisma } from "@/lib/prisma";

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
      medicineId: item.medicine.id,
      name: item.medicine.name,
      category: item.medicine.category,
      quantity: item.quantity,
      price: item.price,
    })),
  };
}
