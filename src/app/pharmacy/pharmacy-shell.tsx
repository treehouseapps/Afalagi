"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  Activity,
  Bell,
  LayoutDashboard,
  PackageSearch,
  Search,
  Settings,
  Store,
} from "lucide-react";
import styles from "./pharmacy.module.css";

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

export default function PharmacyShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
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
        </header>
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
}
