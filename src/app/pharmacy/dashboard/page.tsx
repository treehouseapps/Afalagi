export default function PharmacyOwnerDashboardPage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>Pharmacy Owner Dashboard</h1>
      <p style={{ maxWidth: "700px", marginTop: "0.5rem", color: "#555" }}>
        A quick overview of pharmacy performance, stock status, and common
        actions.
      </p>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginTop: "1.75rem",
        }}
      >
        {[
          { label: "Total Medicines", value: "120" },
          { label: "Low Stock Items", value: "8" },
          { label: "Unavailable", value: "3" },
          { label: "Pending Requests", value: "2" },
        ].map((card) => (
          <div
            key={card.label}
            style={{
              padding: "1.25rem",
              border: "1px solid #ddd",
              borderRadius: "16px",
            }}
          >
            <p style={{ margin: 0, color: "#999" }}>{card.label}</p>
            <p
              style={{
                margin: "0.75rem 0 0",
                fontSize: "1.5rem",
                fontWeight: 700,
              }}
            >
              {card.value}
            </p>
          </div>
        ))}
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Quick Actions</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            marginTop: "1rem",
          }}
        >
          <button type="button" style={{ padding: "0.85rem 1rem" }}>
            View inventory
          </button>
          <button type="button" style={{ padding: "0.85rem 1rem" }}>
            Add medicine
          </button>
          <button type="button" style={{ padding: "0.85rem 1rem" }}>
            Update prices
          </button>
          <button type="button" style={{ padding: "0.85rem 1rem" }}>
            Manage availability
          </button>
        </div>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Recent stock alerts</h2>
        <ul
          style={{
            marginTop: "1rem",
            listStyle: "none",
            padding: 0,
            maxWidth: "760px",
          }}
        >
          {[
            "Amoxicillin 250mg is low in stock",
            "Two medicines are currently marked unavailable",
            "Review pricing for allergy remedies",
          ].map((alert) => (
            <li
              key={alert}
              style={{
                padding: "1rem",
                border: "1px solid #eee",
                borderRadius: "14px",
                marginBottom: "0.75rem",
                background: "#fafafa",
              }}
            >
              {alert}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
