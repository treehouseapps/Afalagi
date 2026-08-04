"use client";

import { useEffect, useMemo, useState } from "react";
import { Pill, Plus, Search, Trash2, Edit } from "lucide-react";
import Link from "next/link";

import { removeMedicine } from "@/actions/inventory";
import { getMyInventory } from "@/actions/pharmacy";
import { Medicine as MedicineType } from "@/types/medicine";

import styles from "../pharmacy.module.css";

type Medicine = MedicineType;

export default function MedicinesPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");

  useEffect(() => {
    async function loadMedicines() {
      const data = await getMyInventory();

      setMedicines(data.medicines);
      setLoading(false);
    }

    loadMedicines();
  }, []);

  async function handleRemove(id: number) {
    const confirmDelete = confirm("Remove this medicine from your pharmacy?");

    if (!confirmDelete) return;

    const result = await removeMedicine(id);

    alert(result.message);

    setMedicines((prev) => prev.filter((medicine) => medicine.id !== id));
  }

  const filteredMedicines = useMemo(() => {
    return medicines.filter((medicine) =>
      medicine.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [medicines, query]);

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
                <th>Quantity</th>
                <th>Price</th>
                <th>Expiry Date</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className={styles.empty}>
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
                      {medicine.expiryDate
                        ? new Date(medicine.expiryDate).toLocaleDateString()
                        : "-"}
                    </td>

                    <td className={styles.rowActions}>
                      <Link href={`/pharmacy/medicines/${medicine.id}/edit`}>
                        <button aria-label="Edit medicine">
                          <Edit size={16} />
                        </button>
                      </Link>

                      <button
                        aria-label="Delete medicine"
                        onClick={() => handleRemove(medicine.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className={styles.empty}>
                    No medicines found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </article>
    </div>
  );
}
