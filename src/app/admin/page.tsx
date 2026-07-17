"use client";

import Link from "next/link";
import { logout } from "@/actions/auth";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const router = useRouter();

  const cards = [
    {
      title: "Medicine Catalog",
      description:
        "Manage global medicines, update medicine information, and control the system catalog.",
      href: "/admin/medicine",
    },
    {
      title: "Pharmacy Management",
      description:
        "Review registered pharmacies, approve requests, and manage pharmacy status.",
      href: "/admin/pharmacies",
    },
    {
      title: "Pharmacy Verification",
      description:
        "Review pharmacy documents and assign verified badges to trusted pharmacies.",
      href: "/admin/verify",
    },
  ];
  const logoutHandler = async () => {
    const result = await logout();
    if (!result.ok) {
      alert("Logout failed. Please try again.");
    } else {
      router.push("/login");
    }
  };
  return (
    <main
      style={{
        padding: "2rem",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>Admin Dashboard</h1>

          <button
            onClick={logoutHandler}
            style={{
              padding: "0.65rem 1.2rem",
              border: "1px solid #ddd",
              borderRadius: "12px",
              background: "#fff",
              cursor: "pointer",
              fontSize: "0.95rem",
              fontWeight: 500,
            }}
          >
            Logout
          </button>
        </div>

        <p
          style={{
            marginTop: "0.75rem",
            color: "#555",
            maxWidth: "720px",
          }}
        >
          Manage Afalagi's medicine catalog, pharmacy network, and pharmacy
          verification system from one place.
        </p>

        <section
          style={{
            marginTop: "2rem",
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          }}
        >
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              style={{
                display: "block",
                padding: "1.5rem",
                border: "1px solid #ddd",
                borderRadius: "16px",
                textDecoration: "none",
                color: "inherit",
                background: "#fff",
              }}
            >
              <h2
                style={{
                  margin: "0 0 0.75rem",
                }}
              >
                {card.title}
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#666",
                  lineHeight: "1.5",
                }}
              >
                {card.description}
              </p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
