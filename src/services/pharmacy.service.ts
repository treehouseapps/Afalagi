import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { getDbErrorMessage } from "@/lib/utils";

export async function getPharmacyDashboardData(userId: number) {
  try {
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
  } catch (error) {
    return {
      pharmacyStatus: "Unavailable",
      totalMedicines: 0,
      medicines: [],
      error: getDbErrorMessage(error),
    };
  }
}
export async function getPharmacyProfile() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
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
  } catch (error) {
    return { error: getDbErrorMessage(error) } as any;
  }
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

  try {
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
  } catch (error) {
    return { ok: false, error: getDbErrorMessage(error) };
  }
}

export async function updatePharmacyById(
  id: number,
  data: {
    name: string;
    address: string;
    city: string;
    phone: string | null;
  },
) {
  try {
    const pharmacy = await prisma.pharmacy.findUnique({
      where: {
        id,
      },
    });

    if (!pharmacy) {
      throw new Error("Pharmacy not found");
    }

    return await prisma.pharmacy.update({
      where: { id },
      data,
    });
  } catch (error) {
    return { ok: false, error: getDbErrorMessage(error) } as any;
  }
}

export async function deletePharmacyById(id: number) {
  try {
    await prisma.inventory.deleteMany({
      where: {
        pharmacyId: id,
      },
    });

    await prisma.pharmacy.delete({
      where: {
        id,
      },
    });

    return { ok: true };
  } catch (error) {
    return { ok: false, error: getDbErrorMessage(error) };
  }
}

export async function getPharmacyById(pharmId: number) {
  try {
    const pharmacy = await prisma.inventory.findMany({
      where: {
        medicineId: Number(pharmId),
      },
      include: {
        pharmacy: true,
      },
    });

    return {
      pharmacy,
    };
  } catch (error) {
    return { pharmacy: [] };
  }
}
export async function getAllPharmacy() {
  try {
    const pharmacyList = await prisma.pharmacy.findMany();
    return pharmacyList;
  } catch (error) {
    return [];
  }
}
export async function getPharmacyResult(pharmId: number) {
  try {
    const pharmacy = await prisma.pharmacy.findFirst({
      where: {
        id: pharmId,
      },
    });

    return pharmacy;
  } catch (error) {
    return null;
  }
}
