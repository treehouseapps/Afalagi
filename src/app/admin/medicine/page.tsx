"use client";

import { useEffect, useState } from "react";
import AddMedicineModal from "./addMedModal";
import EditMedicineModal from "./editMedModal";
import { Medicine as MedicineType } from "@/types/medicine";
import { getMedicine } from "@/actions/medicine";
import { deleteMedicineAction } from "@/actions/medicine";
type Medicine = MedicineType;

export const dynamic = "force-dynamic";

export default function AdminMedicinePage() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
    null,
  );

  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedManufacturers, setSelectedManufacturers] = useState("");

  useEffect(() => {
    async function loadMedicines() {
      const data = await getMedicine();

      setMedicines(data);
      setLoading(false);
    }

    loadMedicines();
  }, []);

  const filteredMedicines = medicines.filter((medicine) => {
    const search = searchTerm.toLowerCase();

    const matchSearch =
      medicine.name.toLowerCase().includes(search) ||
      medicine.genericName?.toLowerCase().includes(search);

    const matchCategory =
      selectedCategory === "" || medicine.category === selectedCategory;

    const matchManufacturer =
      selectedManufacturers === "" ||
      medicine.manufacturer === selectedManufacturers;

    return matchSearch && matchCategory && matchManufacturer;
  });

  const categories = [
    ...new Set(medicines.map((medicine) => medicine.category)),
  ];

  const manufacturers = [
    ...new Set(
      medicines
        .map((medicine) => medicine.manufacturer)
        .filter((manufacturer): manufacturer is string =>
          Boolean(manufacturer),
        ),
    ),
  ];
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this medicine?",
    );

    if (!confirmDelete) return;

    await deleteMedicineAction(id);

    setMedicines((prev) => prev.filter((medicine) => medicine.id !== id));
  };
  return (
    <main className="admin-page">
      <h1>Admin Medicine Management</h1>

      <p>
        Manage the global medicine catalog, update medicine information, and
        monitor available inventory across pharmacies.
      </p>

      <section className="admin-section">
        <div className="admin-section-header">
          <div>
            <h2>Medicine Catalog</h2>

            <p>
              Add, edit, remove, and search medicines registered in the system.
            </p>
          </div>

          <button
            className="admin-button primary"
            type="button"
            onClick={() => setOpenAddModal(true)}
          >
            Add Medicine
          </button>
        </div>

        <div className="admin-filter-area">
          <input
            className="admin-input"
            type="text"
            placeholder="Search medicine name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="admin-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            className="admin-select"
            value={selectedManufacturers}
            onChange={(e) => setSelectedManufacturers(e.target.value)}
          >
            <option value="">All Manufacturers</option>

            {manufacturers.map((manufacturer) => (
              <option key={manufacturer} value={manufacturer}>
                {manufacturer}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="admin-section">
        <h2>All Medicines</h2>

        <p>View and manage medicines available in the global catalog.</p>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>

                <th>Generic Name</th>

                <th>Category</th>

                <th>Manufacturer</th>

                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {" "}
              {loading ? (
                <tr>
                  <td colSpan={6} className="admin-empty">
                    Loading medicines...
                  </td>
                </tr>
              ) : filteredMedicines.length === 0 ? (
                <tr>
                  <td colSpan={6} className="admin-empty">
                    No medicine data available. Please add medicines.
                  </td>
                </tr>
              ) : (
                filteredMedicines.map((medicine) => (
                  <tr key={medicine.id}>
                    <td>{medicine.name}</td>

                    <td>{medicine.genericName || "-"}</td>

                    <td>{medicine.category}</td>

                    <td>{medicine.manufacturer || "-"}</td>

                    <td>
                      <button
                        className="admin-action-button edit"
                        type="button"
                        onClick={() => {
                          setSelectedMedicine(medicine);
                          setEditOpen(true);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(medicine.id)}
                        className="admin-action-button delete"
                        type="button"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="admin-section">
        <h2>Inventory Overview</h2>

        <p>Monitor medicine availability across registered pharmacies.</p>

        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <h3>Total Medicines</h3>

            <p className="admin-stat-number">{medicines.length}</p>
          </div>

          <div className="admin-stat-card">
            <h3>Available Stock</h3>

            <p className="admin-stat-number">0</p>
          </div>

          <div className="admin-stat-card">
            <h3>Registered Pharmacies</h3>

            <p className="admin-stat-number">0</p>
          </div>
        </div>
      </section>

      <AddMedicineModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
      />

      <EditMedicineModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        medicine={selectedMedicine}
      />
    </main>
  );
}
