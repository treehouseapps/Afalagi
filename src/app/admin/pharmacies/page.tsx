"use client";

import { useEffect, useState } from "react";
import ViewModal from "./viewModal";
import EditPharmacyModal from "./editPharmacyModal";
import { Pharmacy as PharmacyType } from "@/types/pharmacy";
import { getPharmacy, deletePharmacyAction } from "@/actions/pharmacy";

export const dynamic = "force-dynamic";

type Pharmacy = PharmacyType;

export default function AdminPharmaciesPage() {
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(
    null,
  );
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const loadPharmacies = async () => {
    setLoading(true);
    const results = await getPharmacy();
    setPharmacies(results);
    setLoading(false);
  };

  useEffect(() => {
    loadPharmacies();
  }, []);

  const filteredPharmacies = pharmacies
    .filter((pharmacy) => {
      const search = searchQuery.toLowerCase();
      const matchSearch =
        search === "" ||
        pharmacy.name.toLowerCase().includes(search) ||
        pharmacy.address.toLowerCase().includes(search) ||
        pharmacy.city.toLowerCase().includes(search);

      return pharmacy.approved && matchSearch;
    })
    .sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (nameA < nameB) return sortOrder === "asc" ? -1 : 1;
      if (nameA > nameB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this pharmacy?",
    );

    if (!confirmDelete) return;

    await deletePharmacyAction(id);
    setPharmacies((prev) => prev.filter((pharmacy) => pharmacy.id !== id));
  };

  const openEdit = (pharmacy: Pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setEditOpen(true);
  };

  return (
    <main className="admin-page">
      <h1>Admin Pharmacy Management</h1>

      <p>
        Manage the registered pharmacy directory with view, edit, and remove
        actions.
      </p>

      <section className="admin-section">
        <div className="admin-section-header">
          <div>
            <h2>Pharmacy Directory</h2>
            <p>
              Search pharmacies by name, address, or city and manage their
              profile details.
            </p>
          </div>
        </div>

        <div className="admin-filter-area">
          <input
            className="admin-input"
            type="text"
            placeholder="Search pharmacies..."
            value={searchTerm}
            onChange={(e) => {
              const value = e.target.value;
              setSearchTerm(value);
              setSearchQuery(value);
            }}
          />

          <button
            className="admin-button primary"
            type="button"
            onClick={() => {
              setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
            }}
          >
            Sort: {sortOrder === "asc" ? "A–Z" : "Z–A"}
          </button>
        </div>
      </section>

      <section className="admin-section">
        <h2>All Pharmacies</h2>
        <p>View, edit, and remove pharmacies from the system.</p>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>City</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="admin-empty">
                    Loading pharmacies...
                  </td>
                </tr>
              ) : filteredPharmacies.length === 0 ? (
                <tr>
                  <td colSpan={6} className="admin-empty">
                    No pharmacies found. Adjust your search or add new entries.
                  </td>
                </tr>
              ) : (
                filteredPharmacies.map((pharmacy) => (
                  <tr key={pharmacy.id}>
                    <td>{pharmacy.name}</td>
                    <td>{pharmacy.address}</td>
                    <td>{pharmacy.city}</td>
                    <td>{pharmacy.phone ?? "-"}</td>
                    <td>{pharmacy.approved ? "Approved" : "Pending"}</td>
                    <td>
                      <button
                        className="admin-action-button edit"
                        type="button"
                        onClick={() => {
                          setSelectedPharmacy(pharmacy);
                          setViewOpen(true);
                        }}
                      >
                        View
                      </button>
                      <button
                        className="admin-action-button edit"
                        type="button"
                        onClick={() => openEdit(pharmacy)}
                      >
                        Edit
                      </button>
                      <button
                        className="admin-action-button delete"
                        type="button"
                        onClick={() => handleDelete(pharmacy.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <ViewModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        pharmacy={selectedPharmacy}
      />

      <EditPharmacyModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        pharmacy={selectedPharmacy}
        onSuccess={loadPharmacies}
      />
    </main>
  );
}
