"use client";

import { useEffect, useMemo, useState } from "react";
import { Edit2, Pill, Plus, Search } from "lucide-react";
import Link from "next/link";

import EditMedicineModal from "./EditMedModal";
import styles from "../pharmacy.module.css";

import { getMyInventory } from "@/actions/pharmacy";

type Medicine = {
  id: number;
  name: string;
  category: string;
  manufacturer?: string | null;
  available: boolean;
};

export default function MedicinesPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");

  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
    null,
  );

  useEffect(() => {
    async function loadMedicines() {
      const data = await getMyInventory();

      setMedicines(data);
      setLoading(false);
    }

    loadMedicines();
  }, []);

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
              {loading ? (
                <tr>
                  <td colSpan={5} className={styles.empty}>
                    Loading medicines...
                  </td>
                </tr>
              ) : filteredMedicines.length ? (
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

      {/* {selectedMedicine && (
        <EditMedicineModal
          open={true}
          medicine={selectedMedicine}
          onClose={() => setSelectedMedicine(null)}
          onSave={updateMedicine}
        />
      )} */}
    </div>
  );
}
