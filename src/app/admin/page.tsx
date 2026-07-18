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
    <main className="admin-page">
      <div className="admin-dashboard-container">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>

          <button className="admin-button" onClick={logoutHandler}>
            Logout
          </button>
        </div>

        <p className="admin-description">
          Manage Afalagi's medicine catalog, pharmacy network, and pharmacy
          verification system from one place.
        </p>

        <section className="admin-card-grid">
          {cards.map((card) => (
            <Link key={card.href} href={card.href} className="admin-card">
              <h2>{card.title}</h2>

              <p>{card.description}</p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
