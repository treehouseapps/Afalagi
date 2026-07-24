"use server";

import { revalidatePath } from "next/cache";
import { createMedicine, updateMedicine } from "@/services/medicine.service";
import { medicineSchema } from "@/validators/medicine.schema";
import { getMedicines } from "@/services/medicine.service";
import { deleteMedicine } from "@/services/medicine.service";
import { getAllMedicines } from "@/services/medicine.service";

function optionalText(formData: FormData, field: string) {
  const value = formData.get(field);
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function getMedicineInput(formData: FormData) {
  const priceValue = optionalText(formData, "price");

  return medicineSchema.parse({
    name: optionalText(formData, "name"),
    description: optionalText(formData, "description"),
    genericName: optionalText(formData, "genericName"),
    category: optionalText(formData, "category"),
    manufacturer: optionalText(formData, "manufacturer"),
    price: priceValue === undefined ? undefined : Number(priceValue),
  });
}

export async function createMedicineAction(formData: FormData) {
  await createMedicine(getMedicineInput(formData));

  revalidatePath("/admin/medicine");
}
export async function getMedicine() {
  return await getMedicines();
}

export async function updateMedicineAction(formData: FormData) {
  const id = Number(formData.get("id"));

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error("A valid medicine id is required.");
  }

  await updateMedicine(id, getMedicineInput(formData));

  revalidatePath("/admin/medicine");
}

export async function deleteMedicineAction(id: number) {
  await deleteMedicine(id);

  revalidatePath("/admin/medicine");
}

export async function getMedicinesForPharmacy() {
  return await getAllMedicines();
}
export async function getAllMedicine() {
  return await getAllMedicines();
}
