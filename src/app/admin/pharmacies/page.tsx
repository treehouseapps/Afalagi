"use client";

import ViewModal from "./viewModal";
import { useState } from "react";
import { Pharmacy as PharmacyType } from "@/types/pharmacy";

export default function AdminPharmaciesPage() {
  const [editOpen, setEditOpen] = useState(false);

  type Pharmacy = PharmacyType;
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(
    null,
  );

  const pendingApprovals = [
    {
      name: "Green Care Pharmacy",
      location: "Ikeja",
      request: "New registration",
    },
    {
      name: "HealthPlus Pharmacy",
      location: "Yaba",
      request: "License renewal",
    },
    {
      name: "Sunrise Pharmacy",
      location: "Surulere",
      request: "Profile update",
    },
  ];

  const approvedPharmacies: Pharmacy[] = [
    {
      id: 1,
      ownerId: 5,
      name: "MediTrust Pharmacy",
      address: "12 Main Street",
      city: "Victoria Island",
      phone: "0911223344",
      latitude: 9.02,
      longitude: 38.74,
      approved: true,
    },
    {
      id: 2,
      ownerId: 6,
      name: "LifeCare Pharmacy",
      address: "Bole Road",
      city: "Addis Ababa",
      phone: "0922334455",
      latitude: 9.01,
      longitude: 38.76,
      approved: true,
    },
  ];

  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>Admin Pharmacy Approvals</h1>
      <p style={{ maxWidth: "720px", marginTop: "0.5rem", color: "#555" }}>
        Review and manage pharmacy registration requests, update statuses, and
        access pharmacy details.
      </p>

      <section
        style={{ marginTop: "1.75rem", display: "grid", gap: "1.25rem" }}
      >
        <div
          style={{
            padding: "1.5rem",
            border: "1px solid #ddd",
            borderRadius: "18px",
          }}
        >
          <h2>Pending pharmacy approvals</h2>
          <p style={{ marginTop: "0.5rem", color: "#666" }}>
            Review new pharmacy registrations and approve or reject them from
            the admin panel.
          </p>
          <div style={{ marginTop: "1rem", display: "grid", gap: "1rem" }}>
            {pendingApprovals.map((item) => (
              <div
                key={item.name}
                style={{
                  padding: "1rem",
                  border: "1px solid #eee",
                  borderRadius: "14px",
                  background: "#fafafa",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <div>
                    <p style={{ margin: 0, fontWeight: 700 }}>{item.name}</p>
                    <p style={{ margin: "0.25rem 0 0", color: "#666" }}>
                      {item.location}
                    </p>
                    <p style={{ margin: "0.25rem 0 0", color: "#666" }}>
                      {item.request}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    <button type="button" style={{ padding: "0.75rem 1rem" }}>
                      Approve
                    </button>
                    <button type="button" style={{ padding: "0.75rem 1rem" }}>
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            padding: "1.5rem",
            border: "1px solid #ddd",
            borderRadius: "18px",
          }}
        >
          <h2>Approved pharmacies</h2>
          <p style={{ marginTop: "0.5rem", color: "#666" }}>
            View approved pharmacies and manage their active admin settings.
          </p>
          <div style={{ overflowX: "auto", marginTop: "1rem" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "0.75rem",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    Pharmacy
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "0.75rem",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    Location
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "0.75rem",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    Status
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
                {approvedPharmacies.map((item, index) => (
                  <tr
                    key={item.id}
                    style={{
                      background: index % 2 === 0 ? "#fafafa" : "white",
                    }}
                  >
                    <td style={{ padding: "0.75rem" }}>{item.name}</td>
                    <td>{item.city}</td>
                    <td>{item.approved ? "Approved" : "Pending"}</td>
                    <td
                      style={{
                        paddingLeft: " 0.75rem",
                        textAlign: "center",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedPharmacy(item);
                          setEditOpen(true);
                        }}
                        style={{ marginRight: "0.5rem" }}
                      >
                        View
                      </button>
                      <button type="button">Suspend</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <ViewModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        pharmacy={selectedPharmacy}
      />
    </main>
  );
}
