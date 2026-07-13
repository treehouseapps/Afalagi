import Link from "next/link";

export default function AdminPharmacyVerificationPage() {
  const Pharmacy = [
    {
      id: 1,
      name: "MediTrust Pharmacy",
      city: "Addis Ababa",
      location: "Addis Ababa",
      status: "Approved",
      documents: ["Digital ID", "Pharmacy License", "Trade License"],
    },
    {
      id: 2,
      name: "LifeCare Pharmacy",
      city: "Hawassa",
      location: "Hawassa",
      status: "Approved",
      documents: ["Digital ID", "Pharmacy License", "Trade License"],
    },
  ];
  const VerifiedPharmacy = Pharmacy.filter(
    (pharmacy) => pharmacy.status === "Approved",
  );
  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>Pharmacy Verification</h1>

      <p
        style={{
          maxWidth: "720px",
          marginTop: "0.5rem",
          color: "#555",
        }}
      >
        Review pharmacy documents and verify trusted pharmacies that meet
        Afalagi requirements.
      </p>

      <section
        style={{
          marginTop: "1.75rem",
          display: "grid",
          gap: "1.25rem",
        }}
      >
        {/* Pending Verification */}

        <div
          style={{
            padding: "1.5rem",
            border: "1px solid #ddd",
            borderRadius: "18px",
          }}
        >
          <h2>Pending Verification Requests</h2>

          <p
            style={{
              marginTop: "0.5rem",
              color: "#666",
            }}
          >
            Check pharmacy licenses and documents before giving the verified
            badge.
          </p>

          <div
            style={{
              marginTop: "1rem",
              display: "grid",
              gap: "1rem",
            }}
          >
            {Pharmacy.map((pharmacy) => (
              <div
                key={pharmacy.name}
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
                    gap: "1rem",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: 700,
                      }}
                    >
                      {pharmacy.name}
                    </p>

                    <p
                      style={{
                        margin: "0.25rem 0",
                        color: "#666",
                      }}
                    >
                      {pharmacy.city}
                    </p>

                    <p
                      style={{
                        margin: "0.25rem 0",
                        color: "#666",
                      }}
                    >
                      Documents:
                    </p>

                    {pharmacy.documents.map((doc) => (
                      <span
                        key={doc}
                        style={{
                          display: "block",
                          color: "#555",
                        }}
                      >
                        ✓ {doc}
                      </span>
                    ))}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "0.75rem",
                    }}
                  >
                    <Link href={`/admin/verify/${pharmacy.id}`}>
                      <button
                        type="button"
                        style={{
                          padding: "0.75rem 1rem",
                        }}
                      >
                        View Documents
                      </button>
                    </Link>

                    <button
                      type="button"
                      style={{
                        padding: "0.75rem 1rem",
                      }}
                    >
                      Verify
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Pharmacies */}

        <div
          style={{
            padding: "1.5rem",
            border: "1px solid #ddd",
            borderRadius: "18px",
          }}
        >
          <h2>Verified Pharmacies</h2>

          <p
            style={{
              marginTop: "0.5rem",
              color: "#666",
            }}
          >
            Pharmacies that have completed verification and can display the
            trusted badge.
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
                    Verification
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
                {VerifiedPharmacy.map((item, index) => (
                  <tr
                    key={item.name}
                    style={{
                      background: index % 2 === 0 ? "#fafafa" : "white",
                    }}
                  >
                    <td style={{ padding: "0.75rem" }}>{item.name}</td>

                    <td style={{ padding: "0.75rem" }}>{item.location}</td>

                    <td style={{ padding: "0.75rem" }}>✓ {item.status}</td>

                    <td style={{ padding: "0.75rem" }}>
                      <button type="button">Remove Badge</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}
