export default function DashboardMedicinesPage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <h1>Manage Inventory</h1>
        <p style={{ marginTop: "0.5rem", color: "#555" }}>
          Monitor stock levels, update pricing, and identify low-stock
          medicines.
        </p>

        <section style={{ marginTop: "2rem" }}>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button type="button" style={{ padding: "0.85rem 1rem" }}>
              Add new inventory
            </button>
            <button type="button" style={{ padding: "0.85rem 1rem" }}>
              Export stock report
            </button>
          </div>

          <div style={{ overflowX: "auto", marginTop: "1.5rem" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "0.85rem",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    Medicine
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "0.85rem",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    Stock
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "0.85rem",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    Price
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "0.85rem",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    Status
                  </th>
                  <th
                    style={{
                      padding: "0.85rem",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    name: "Paracetamol 500mg",
                    stock: 38,
                    price: "₦1,500",
                    status: "Available",
                  },
                  {
                    name: "Ibuprofen 200mg",
                    stock: 18,
                    price: "₦1,800",
                    status: "Low stock",
                  },
                  {
                    name: "Loratadine 10mg",
                    stock: 0,
                    price: "₦1,250",
                    status: "Unavailable",
                  },
                ].map((item, index) => (
                  <tr
                    key={item.name}
                    style={{ background: index % 2 === 0 ? "#fafafa" : "#fff" }}
                  >
                    <td style={{ padding: "0.85rem" }}>{item.name}</td>
                    <td style={{ padding: "0.85rem" }}>{item.stock}</td>
                    <td style={{ padding: "0.85rem" }}>{item.price}</td>
                    <td
                      style={{
                        padding: "0.85rem",
                        color: item.status === "Unavailable" ? "#c00" : "#333",
                      }}
                    >
                      {item.status}
                    </td>
                    <td style={{ padding: "0.85rem" }}>
                      <button
                        type="button"
                        style={{
                          marginRight: "0.5rem",
                          padding: "0.6rem 0.85rem",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        style={{ padding: "0.6rem 0.85rem" }}
                      >
                        Set status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
