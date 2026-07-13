export default function PharmacyProfilePage() {
  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ maxWidth: "920px", margin: "0 auto" }}>
        <h1>Pharmacy Profile</h1>
        <p style={{ marginTop: "0.5rem", color: "#555" }}>
          View and update pharmacy information, contact details, and operating
          hours.
        </p>

        <section style={{ marginTop: "2rem", display: "grid", gap: "1.5rem" }}>
          <div
            style={{
              padding: "1.5rem",
              border: "1px solid #ddd",
              borderRadius: "18px",
            }}
          >
            <h2>Pharmacy Details</h2>
            <div style={{ display: "grid", gap: "0.75rem", marginTop: "1rem" }}>
              <div>
                <strong>Name:</strong> Sunshine Pharmacy
              </div>
              <div>
                <strong>Location:</strong> Ikeja, Lagos
              </div>
              <div>
                <strong>Owner:</strong> Fatima Oladipo
              </div>
              <div>
                <strong>License Status:</strong> Active
              </div>
            </div>
            <button
              type="button"
              style={{ marginTop: "1.25rem", padding: "0.85rem 1rem" }}
            >
              Edit pharmacy details
            </button>
          </div>

          <div
            style={{
              padding: "1.5rem",
              border: "1px solid #ddd",
              borderRadius: "18px",
            }}
          >
            <h2>Contact & Hours</h2>
            <div style={{ display: "grid", gap: "0.75rem", marginTop: "1rem" }}>
              <div>
                <strong>Phone:</strong> +234 812 345 6789
              </div>
              <div>
                <strong>Email:</strong> hello@sunshinepharmacy.ng
              </div>
              <div>
                <strong>Open Hours:</strong> Mon - Sat, 8:00 AM - 10:00 PM
              </div>
              <div>
                <strong>Delivery:</strong> Available
              </div>
            </div>
            <button
              type="button"
              style={{ marginTop: "1.25rem", padding: "0.85rem 1rem" }}
            >
              Update hours & contact
            </button>
          </div>

          <div
            style={{
              padding: "1.5rem",
              border: "1px solid #ddd",
              borderRadius: "18px",
            }}
          >
            <h2>Profile actions</h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.75rem",
                marginTop: "1rem",
              }}
            >
              <button type="button" style={{ padding: "0.9rem 1rem" }}>
                View inventory
              </button>
              <button type="button" style={{ padding: "0.9rem 1rem" }}>
                Set availability rules
              </button>
              <button type="button" style={{ padding: "0.9rem 1rem" }}>
                Manage opening hours
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
