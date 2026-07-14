"use client";

import { useMemo, useState } from "react";
import { Edit2, Pill, Plus, Search, Trash2 } from "lucide-react";
import Link from "next/link";

import EditMedicineModal from "./EditMedModal";
import styles from "../pharmacy.module.css";

type Medicine = {
  id: string;
  name: string;
  category: string;
  manufacturer?: string;
  available: boolean;
};

const initialMedicines: Medicine[] = [
  {
    id: "m1",
    name: "Amoxicillin 500mg",
    category: "Antibiotics",
    manufacturer: "GSK",
    available: true,
  },
  {
    id: "m2",
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    manufacturer: "FarmaTech",
    available: true,
  },
  {
    id: "m3",
    name: "Metformin 500mg",
    category: "Diabetes",
    manufacturer: "Merck",
    available: false,
  },
];

export default function MedicinesPage() {
  const [medicines, setMedicines] = useState(initialMedicines);

  const [query, setQuery] = useState("");

  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
    null,
  );

  const filteredMedicines = useMemo(() => {
    return medicines.filter((medicine) =>
      medicine.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [medicines, query]);

  function updateMedicine(updated: Medicine) {
    setMedicines((items) =>
      items.map((item) => (item.id === updated.id ? updated : item)),
    );

    setSelectedMedicine(null);
  }

  function removeMedicine(id: string) {
    setMedicines((items) => items.filter((item) => item.id !== id));
  }

  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <label className={styles.inventorySearch}>
          <Search size={16} />

          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search your medicines..."
          />
        </label>

        <Link href="/pharmacy/add">
          <button className={styles.primaryButton}>
            <Plus size={17} />
            Add Medicine
          </button>
        </Link>
      </div>

      <article className={styles.card}>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Medicine</th>

                <th>Category</th>

                <th>Manufacturer</th>

                <th>Availability</th>

                <th />
              </tr>
            </thead>

            <tbody>
              {filteredMedicines.length ? (
                filteredMedicines.map((medicine) => (
                  <tr key={medicine.id}>
                    <td className={styles.medicineName}>
                      <Pill size={15} />

                      {medicine.name}
                    </td>

                    <td>{medicine.category}</td>

                    <td>{medicine.manufacturer || "-"}</td>

                    <td>
                      <span
                        className={
                          medicine.available ? styles.inStock : styles.outStock
                        }
                      >
                        {medicine.available ? "Available" : "Unavailable"}
                      </span>
                    </td>

                    <td className={styles.rowActions}>
                      <button
                        aria-label="Edit medicine"
                        onClick={() => setSelectedMedicine(medicine)}
                      >
                        <Edit2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className={styles.empty}>
                    No medicines found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </article>

      {selectedMedicine && (
        <EditMedicineModal
          open={true}
          medicine={selectedMedicine}
          onClose={() => setSelectedMedicine(null)}
          onSave={updateMedicine}
        />
      )}
    </div>
  );
}
