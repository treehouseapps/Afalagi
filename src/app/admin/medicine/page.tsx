"use client";

import { useState } from "react";
import AddMedicineModal from "./addMedModal";
import EditMedicineModal from "./editMedModal";
import { Medicine as MedicineType } from "@/types/medicine";

type Medicine = MedicineType;

export default function AdminMedicinePage() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
    null,
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedManufacturers, setSelectedManufacturers] = useState("");

  const medicines = [
    {
      id: 1,
      name: "Panadol 500mg",
      genericName: "Paracetamol",
      category: "Analgesic",
      manufacturer: "GSK",
      price: 10,
    },
    {
      id: 2,
      name: "Amoxil 250mg",
      genericName: "Amoxicillin",
      category: "Antibiotic",
      manufacturer: "GSK",
      price: 25,
    },
    {
      id: 3,
      name: "Zyrtec 10mg",
      genericName: "Cetirizine",
      category: "Antihistamine",
      manufacturer: "UCB",
      price: 15,
    },
  ];

  const filteredMedicines = medicines.filter((medicine) => {
    const matchSearch =
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.genericName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchCategory =
      selectedCategory === "" || medicine.category === selectedCategory;

    const matchManufacturer =
      selectedManufacturers === "" ||
      medicine.manufacturer === selectedManufacturers;

    return matchSearch && matchCategory && matchManufacturer;
  });

  const categories = [...new Set(medicines.map((m) => m.category))];
  const manufacturers = [...new Set(medicines.map((m) => m.manufacturer))];

  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>Admin Medicine Management</h1>
      <p
        style={{
          maxWidth: "720px",
          marginTop: "0.5rem",
          color: "#555",
        }}
      >
        Manage the global medicine catalog, update medicine information, and
        monitor available inventory across pharmacies.
      </p>
      {/* Medicine Controls */}
      <section
        style={{
          marginTop: "1.75rem",
          padding: "1.5rem",
          border: "1px solid #ddd",
          borderRadius: "18px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h2>Medicine Catalog</h2>

            <p
              style={{
                marginTop: "0.5rem",
                color: "#666",
              }}
            >
              Add, edit, remove, and search medicines registered in the system.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpenAddModal(true)}
            style={{
              padding: "0.8rem 1.2rem",
            }}
          >
            Add Medicine
          </button>
        </div>

        {/* Search and Filter */}

        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginTop: "1.5rem",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder="Search medicine name..."
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "0.75rem",
              flex: 1,
              minWidth: "250px",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            <option value={""}>All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={selectedManufacturers}
            onChange={(e) => setSelectedManufacturers(e.target.value)}
            style={{
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            <option value={""}>All Manufacturers</option>

            {manufacturers.map((manufacturer) => (
              <option key={manufacturer} value={manufacturer}>
                {manufacturer}
              </option>
            ))}
          </select>
        </div>
      </section>{" "}
      {/* Medicine Table */}
      <section
        style={{
          marginTop: "1.75rem",
          padding: "1.5rem",
          border: "1px solid #ddd",
          borderRadius: "18px",
        }}
      >
        <h2>All Medicines</h2>

        <p
          style={{
            marginTop: "0.5rem",
            color: "#666",
          }}
        >
          View and manage medicines available in the global catalog.
        </p>

        <div
          style={{
            overflowX: "auto",
            marginTop: "1rem",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    textAlign: "left",
                    padding: "0.75rem",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  Name
                </th>

                <th
                  style={{
                    textAlign: "left",
                    padding: "0.75rem",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  Generic Name
                </th>

                <th
                  style={{
                    textAlign: "left",
                    padding: "0.75rem",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  Category
                </th>

                <th
                  style={{
                    textAlign: "left",
                    padding: "0.75rem",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  Manufacturer
                </th>

                <th
                  style={{
                    textAlign: "left",
                    padding: "0.75rem",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  Price
                </th>

                <th
                  style={{
                    padding: "0.75rem",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredMedicines.map((medicine, index) => (
                <tr
                  key={medicine.id}
                  style={{
                    background: index % 2 === 0 ? "#fafafa" : "white",
                  }}
                >
                  <td
                    style={{
                      padding: "0.75rem",
                    }}
                  >
                    {medicine.name}
                  </td>

                  <td
                    style={{
                      padding: "0.75rem",
                    }}
                  >
                    {medicine.genericName}
                  </td>

                  <td
                    style={{
                      padding: "0.75rem",
                    }}
                  >
                    {medicine.category}
                  </td>

                  <td
                    style={{
                      padding: "0.75rem",
                    }}
                  >
                    {medicine.manufacturer}
                  </td>

                  <td
                    style={{
                      padding: "0.75rem",
                    }}
                  >
                    {medicine.price} Birr
                  </td>

                  <td
                    style={{
                      padding: "0.75rem",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedMedicine(medicine);
                        setEditOpen(true);
                      }}
                      style={{
                        marginRight: "0.5rem",
                      }}
                    >
                      Edit
                    </button>

                    <button type="button">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>{" "}
      {/* Inventory Overview */}
      <section
        style={{
          marginTop: "1.75rem",
          padding: "1.5rem",
          border: "1px solid #ddd",
          borderRadius: "18px",
        }}
      >
        <h2>Inventory Overview</h2>

        <p
          style={{
            marginTop: "0.5rem",
            color: "#666",
          }}
        >
          Monitor medicine availability across registered pharmacies.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <div
            style={{
              padding: "1rem",
              border: "1px solid #eee",
              borderRadius: "14px",
              background: "#fafafa",
            }}
          >
            <h3>Total Medicines</h3>

            <p
              style={{
                marginTop: "0.5rem",
                fontSize: "1.5rem",
                fontWeight: 700,
              }}
            >
              3
            </p>
          </div>

          <div
            style={{
              padding: "1rem",
              border: "1px solid #eee",
              borderRadius: "14px",
              background: "#fafafa",
            }}
          >
            <h3>Available Stock</h3>

            <p
              style={{
                marginTop: "0.5rem",
                fontSize: "1.5rem",
                fontWeight: 700,
              }}
            >
              2,540
            </p>
          </div>

          <div
            style={{
              padding: "1rem",
              border: "1px solid #eee",
              borderRadius: "14px",
              background: "#fafafa",
            }}
          >
            <h3>Registered Pharmacies</h3>

            <p
              style={{
                marginTop: "0.5rem",
                fontSize: "1.5rem",
                fontWeight: 700,
              }}
            >
              120
            </p>
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
