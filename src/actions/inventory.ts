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
import { removeMedicineFromPharmacy } from "@/services/inventory.service";

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

  if (!token) throw new Error("Not authenticated");

  const result = await verifyToken(token);

  const userId = result.payload.id;

  await addMedicineToPharm(medicineId, Number(userId));

  revalidatePath("/pharmacy/medicines");
}

export async function removeMedicine(inventoryId: number) {
  const result = await removeMedicineFromPharmacy(inventoryId);

  revalidatePath("/pharmacy/inventory");

  return result;
}
