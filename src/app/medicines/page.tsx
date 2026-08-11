import { Suspense } from "react";
import MedicinesContent from "./MedicinesContent";
import { getAllMedicines } from "@/services/medicine.service";

export default async function MedicinesPage() {
  const inventory = await getAllMedicines();

  const initialMedicines = inventory.map((item) => ({
    id: item.id,
    medicineId: item.medicine.id,
    name: item.medicine.name,
    description: item.medicine.description,
    category: item.medicine.category,
    genericName: item.medicine.genericName,
    manufacturer: item.medicine.manufacturer,
    dosage: item.dosage ?? null,
    sideEffect: item.sideEffect ?? null,
    price: item.price ?? null,
    expiryDate: item.expiryDate ?? null,
  }));

  return (
    <Suspense fallback={<div>Loading medicines...</div>}>
      <MedicinesContent initialMedicines={initialMedicines} />
    </Suspense>
  );
}
