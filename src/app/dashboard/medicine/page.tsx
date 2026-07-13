export default function PharmacyMedicineStockPage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>Pharmacy Medicine Stock</h1>
      <p style={{ maxWidth: "700px", marginTop: "0.5rem", color: "#555" }}>
        Manage the pharmacy stock with add/remove, price updates, and
        availability controls.
      </p>

      <section style={{ marginTop: "2rem", display: "grid", gap: "1.25rem" }}>
        <div
          style={{
            padding: "1.5rem",
            border: "1px solid #ddd",
            borderRadius: "18px",
          }}
        >
          <h2>Add medicine to pharmacy</h2>
          <div style={{ display: "grid", gap: "0.85rem", marginTop: "1rem" }}>
            <input
              type="text"
              placeholder="Medicine name"
              style={{
                padding: "0.85rem",
                borderRadius: "12px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="text"
              placeholder="Generic name"
              style={{
                padding: "0.85rem",
                borderRadius: "12px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="number"
              placeholder="Initial stock"
              style={{
                padding: "0.85rem",
                borderRadius: "12px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="number"
              placeholder="Price"
              style={{
                padding: "0.85rem",
                borderRadius: "12px",
                border: "1px solid #ccc",
              }}
            />
            <button
              type="button"
              style={{ padding: "0.9rem 1rem", marginTop: "0.5rem" }}
            >
              Add medicine
            </button>
          </div>
        </div>

        <div
          style={{
            padding: "1.5rem",
            border: "1px solid #ddd",
            borderRadius: "18px",
          }}
        >
          <h2>Stock controls</h2>
          <div style={{ display: "grid", gap: "0.85rem", marginTop: "1rem" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.75rem",
              }}
            >
              <button type="button" style={{ padding: "0.9rem" }}>
                Increase stock
              </button>
              <button type="button" style={{ padding: "0.9rem" }}>
                Decrease stock
              </button>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.75rem",
              }}
            >
              <button type="button" style={{ padding: "0.9rem" }}>
                Update price
              </button>
              <button type="button" style={{ padding: "0.9rem" }}>
                Mark unavailable
              </button>
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Current pharmacy inventory</h2>
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
                  Medicine
                </th>
                <th
                  style={{
                    textAlign: "left",
                    padding: "0.75rem",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  Stock
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
                    textAlign: "left",
                    padding: "0.75rem",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  Status
                </th>
                <th
                  style={{ padding: "0.75rem", borderBottom: "1px solid #ddd" }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: "Paracetamol 500mg",
                  stock: 34,
                  price: "₦1,500",
                  status: "Available",
                },
                {
                  name: "Amoxicillin 250mg",
                  stock: 12,
                  price: "₦2,600",
                  status: "Low stock",
                },
                {
                  name: "Cetirizine 10mg",
                  stock: 0,
                  price: "₦1,200",
                  status: "Unavailable",
                },
              ].map((item, index) => (
                <tr
                  key={item.name}
                  style={{ background: index % 2 === 0 ? "#fafafa" : "white" }}
                >
                  <td style={{ padding: "0.75rem" }}>{item.name}</td>
                  <td style={{ padding: "0.75rem" }}>{item.stock}</td>
                  <td style={{ padding: "0.75rem" }}>{item.price}</td>
                  <td
                    style={{
                      padding: "0.75rem",
                      color: item.status === "Unavailable" ? "#c00" : "#333",
                    }}
                  >
                    {item.status}
                  </td>
                  <td style={{ padding: "0.75rem" }}>
                    <button type="button" style={{ marginRight: "0.5rem" }}>
                      Update
                    </button>
                    <button type="button">Toggle availability</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
