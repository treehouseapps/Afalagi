"use server";

import { revalidatePath } from "next/cache";
import {
  addInventory,
  updateInventory,
  deleteInventory,
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
