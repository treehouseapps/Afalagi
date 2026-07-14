"use client";

import { useMemo, useState } from "react";
import { Search, Plus, Pill, CheckCircle } from "lucide-react";
import { Medicine as MedicineType } from "@/types/medicine";

import styles from "../../pharmacy/pharmacy.module.css";

type Medicine = MedicineType;

const medicines: Medicine[] = [
  {
    id: 1,
    name: "Amoxicillin 500mg",
    genericName: "Amoxicillin",
    category: "Antibiotics",
    manufacturer: "GSK",
    price: 120,
  },
  {
    id: 2,
    name: "Amoxicillin 500mg",
    genericName: "Amoxicillin",
    category: "Antibiotics",
    manufacturer: "Pharma Ethiopia",
    price: 110,
  },
  {
    id: 3,
    name: "Paracetamol 500mg",
    genericName: "Paracetamol",
    category: "Pain Relief",
    manufacturer: "FarmaTech",
    price: 35,
  },
  {
    id: 4,
    name: "Metformin 500mg",
    genericName: "Metformin",
    category: "Diabetes",
    manufacturer: "Merck",
    price: 90,
  },
];

export default function AddMedicinePage() {
  const [query, setQuery] = useState("");

  const [added, setAdded] = useState<number[]>([]);

  const filteredMedicines = useMemo(() => {
    return medicines.filter((medicine) =>
      medicine.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  function addMedicine(id: number) {
    setAdded((current) => (current.includes(id) ? current : [...current, id]));
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
            placeholder="Search medicine name..."
          />
        </div>

        <div className={styles.catalog}>
          {filteredMedicines.length ? (
            filteredMedicines.map((medicine) => {
              const alreadyAdded = added.includes(medicine.id);

              return (
                <div key={medicine.id} className={styles.catalogItem}>
                  <div className={styles.selectedMed}>
                    <Pill size={20} />

                    <span>
                      <strong>{medicine.name}</strong>

                      <small>
                        {medicine.genericName}
                        {" · "}
                        {medicine.category}
                      </small>

                      <small>
                        Manufacturer: {medicine.manufacturer || "-"}
                      </small>
                    </span>
                  </div>

                  <button
                    className={
                      alreadyAdded
                        ? styles.secondaryButton
                        : styles.primaryButton
                    }
                    disabled={alreadyAdded}
                    onClick={() => addMedicine(medicine.id)}
                  >
                    {alreadyAdded ? (
                      <>
                        <CheckCircle size={16} />
                        Added
                      </>
                    ) : (
                      <>
                        <Plus size={16} />
                        Add Medicine
                      </>
                    )}
                  </button>
                </div>
              );
            })
          ) : (
            <div className={styles.empty}>No medicines found.</div>
          )}
        </div>
      </article>
    </div>
  );
}
