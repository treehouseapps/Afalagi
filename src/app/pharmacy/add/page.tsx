"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Pill } from "lucide-react";
import styles from "../../pharmacy/pharmacy.module.css";
import { getMedicine } from "@/actions/medicine";
import { InventoryMedicine as MedicineType } from "@/types/medicine";
import { addMedicineToPharmacy } from "@/actions/inventory";

export default function AddMedicinePage() {
  const [query, setQuery] = useState("");

  const [medicines, setMedicines] = useState<MedicineType[]>([]);

  useEffect(() => {
    async function loadMedicines() {
      const data = await getMedicine();
      setMedicines(data);
    }

    loadMedicines();
  }, []);

  async function handleAdd(medicineId: number) {
    await addMedicineToPharmacy(medicineId);
  }

  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <div>
          <h1>Add Medicine</h1>
          <p className={styles.help}>
            Search Afalagi medicine catalog and add medicines available in your
            pharmacy.
          </p>
        </div>
      </div>

      <article className={styles.card}>
        <div className={styles.inventorySearch}>
          <Search size={17} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search medicine..."
          />
        </div>

        <div className={styles.catalog}>
          {medicines.length > 0 ? (
            medicines.map((medicine) => (
              <div key={medicine.id} className={styles.catalogItem}>
                <div className={styles.selectedMed}>
                  <Pill size={20} />

                  <span>
                    <strong>{medicine.name}</strong>

                    <small>
                      {medicine.genericName} · {medicine.category}
                    </small>

                    <small>Manufacturer: {medicine.manufacturer || "-"}</small>
                  </span>
                </div>

                <button
                  onClick={() => handleAdd(medicine.id)}
                  className={styles.primaryButton}
                >
                  <Plus size={16} />
                  Add Medicine
                </button>
              </div>
            ))
          ) : (
            <div className={styles.empty}>No medicines found.</div>
          )}
        </div>
      </article>
    </div>
  );
}
