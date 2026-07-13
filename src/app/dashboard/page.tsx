import Link from "next/link";

export default function DashboardPage() {
  const sections = [
    {
      title: "Pharmacy Owner Dashboard",
      description:
        "Overview of pharmacy performance, alerts, and quick actions.",
      href: "/dashboard/pharmacy",
    },
    {
      title: "Manage Inventory",
      description:
        "Review inventory levels, update prices, and track stock status.",
      href: "/dashboard/medicines",
    },
    {
      title: "Stock Management",
      description: "Add medicines, adjust stock, and mark availability.",
      href: "/dashboard/medicine",
    },
  ];

  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <h1>Pharmacy Dashboard</h1>
        <p style={{ marginTop: "0.75rem", color: "#555" }}>
          Select a pharmacy section to manage stock, pricing, and profile
          details.
        </p>

        <section
          style={{
            marginTop: "2rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1rem",
          }}
        >
          {sections.map((section) => (
            <Link
              key={section.href}
              href={section.href}
              style={{
                display: "block",
                padding: "1.5rem",
                border: "1px solid #ddd",
                borderRadius: "18px",
                background: "#fff",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <h2 style={{ margin: 0 }}>{section.title}</h2>
              <p style={{ marginTop: "0.75rem", color: "#666" }}>
                {section.description}
              </p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
