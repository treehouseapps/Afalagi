"use server";

import { revalidatePath } from "next/cache";
import {
  addInventory,
  updateInventory,
  deleteInventory,
  addMedicineToPharm,
} from "@/services/inventory.service";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import {
  removeMedicineFromPharmacy,
  getinventorymed,
  updateInventoryMed,
} from "@/services/inventory.service";

export async function addInventoryAction(data: {
  pharmacyId: number;
  medicineId: number;
  quantity: number;
  price?: number;
  expiryDate?: Date;
}) {
  await addInventory(data);

  revalidatePath("/pharmacy/medicines");
}

export async function updateInventoryAction(
  id: number,
  data: {
    quantity?: number;
    price?: number;
    expiryDate?: Date;
  },
) {
  await updateInventory(id, data);

  revalidatePath("/pharmacy/medicines");
}

export async function deleteInventoryAction(id: number) {
  await deleteInventory(id);

  revalidatePath("/pharmacy/medicines");
}

export async function addMedicineToPharmacy(medicineId: number) {
  const token = cookies().get("token")?.value;

  if (!token) return { success: false, message: "Not authenticated." };

  try {
    const result = await verifyToken(token);
    const userId = result.payload.id;
    return await addMedicineToPharm(medicineId, Number(userId));
  } catch (error) {
    return { success: false, message: "Unable to add medicine right now." };
  }
}

export async function removeMedicine(inventoryId: number) {
  try {
    const result = await removeMedicineFromPharmacy(inventoryId);
    revalidatePath("/pharmacy/inventory");
    return result;
  } catch (error) {
    return { success: false, message: "Unable to remove medicine right now." };
  }
}

export async function getInventoryMedicine(id: number) {
  try {
    return await getinventorymed(id);
  } catch (error) {
    return null;
  }
}

export async function updateInventoryMedicine(data: {
  id: number;
  quantity: number;
  price: number | null;
  expiryDate: Date | null;
}) {
  try {
    return await updateInventoryMed(data);
  } catch (error) {
    throw new Error("Unable to update inventory right now.");
  }
}
