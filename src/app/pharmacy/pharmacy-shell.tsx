"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Activity, LayoutDashboard, PackageSearch, Store } from "lucide-react";
import styles from "./pharmacy.module.css";
import { useRouter } from "next/navigation";
import { logout } from "@/actions/auth";

export default function PharmacyShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: "/pharmacy", label: "Dashboard", icon: LayoutDashboard },
    {
      href: "/pharmacy/medicines",
      label: "Manage Medicines",
      icon: PackageSearch,
    },
    { href: "/pharmacy/profile", label: "Pharmacy Profile", icon: Store },
  ];

  function titleFor(pathname: string) {
    if (pathname.endsWith("/medicines")) return "Medicine Management";
    if (pathname.endsWith("/profile")) return "Pharmacy Profile";
    return "Dashboard Overview";
  }
  const logoutHandler = async () => {
    const result = await logout();
    if (!result.ok) {
      // alert("Logout failed. Please try again.");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className={styles.portal}>
      <aside className={styles.sidebar}>
        <Link href="/pharmacy" className={styles.brand}>
          <Activity size={23} />
          <span>
            afalagi <small>Partner</small>
          </span>
        </Link>
        <nav className={styles.navigation} aria-label="Pharmacy navigation">
          <p>Menu</p>
          {links.map(({ href, label, icon: Icon }) => {
            const active =
              href === "/pharmacy"
                ? pathname === href
                : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={active ? styles.activeNav : styles.navLink}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className={styles.account}>
          <span>HP</span>
          <div>
            <strong>Health Plus</strong>
            <small>Owner</small>
          </div>
        </div>
      </aside>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>{titleFor(pathname)}</h1>
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
        </header>
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
}
