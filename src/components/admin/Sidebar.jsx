"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    {
      title: "Dashboard",
      href: "/admin",
    },
    {
      title: "Medicines",
      href: "/admin/medicine",
    },
    {
      title: "Pharmacies",
      href: "/admin/pharmacies",
    },
    {
      title: "Verification",
      href: "/admin/verify",
    },
  ];

  return (
    <aside
      style={{
        width: "250px",
        minHeight: "100vh",
        borderRight: "1px solid #ddd",
        background: "#fff",
        padding: "1.5rem",
      }}
    >
      <h2
        style={{
          marginBottom: "2rem",
        }}
      >
        Afalagi Admin
      </h2>

      <nav
        style={{
          display: "grid",
          gap: "0.75rem",
        }}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              textDecoration: "none",
              color: pathname === link.href ? "#fff" : "#333",
              background: pathname === link.href ? "#2563eb" : "transparent",
              padding: "0.85rem 1rem",
              borderRadius: "10px",
              border: pathname === link.href ? "none" : "1px solid #ddd",
              fontWeight: 600,
            }}
          >
            {link.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
