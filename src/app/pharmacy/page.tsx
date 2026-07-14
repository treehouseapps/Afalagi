import Link from "next/link";
import type { ReactNode } from "react";
import {
  Activity,
  ArrowUpRight,
  PackageSearch,
  ShieldCheck,
} from "lucide-react";
import styles from "./pharmacy.module.css";

export default function PharmacyDashboardPage() {
  const medicines = [
    ["Paracetamol 500mg", "Pain Relief"],
    ["Metformin 500mg", "Diabetes"],
    ["Amoxicillin 500mg", "Antibiotics"],
  ] as const;

  return (
    <div className={styles.page}>
      <section className={styles.metrics}>
        <Metric
          icon={<PackageSearch />}
          label="Total Medicines Listed"
          value="142"
        />

        <Metric
          icon={<Activity />}
          label="Searches Last 7 Days"
          value="1,249"
          extra={
            <span className={styles.growth}>
              <ArrowUpRight size={13} />
              12%
            </span>
          }
        />

        <Metric
          icon={<ShieldCheck />}
          label="Pharmacy Status"
          value="Verified"
        />
      </section>

      <section className={styles.dashboardGrid}>
        <article className={styles.card}>
          <div className={styles.cardHeading}>
            <h2>Medicine Availability</h2>

            <Link href="/pharmacy/medicines">Manage Medicines →</Link>
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>Medicine</th>
                <th>Category</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {medicines.map(([name, status]) => (
                <tr key={name}>
                  <td>
                    <strong>{name}</strong>
                  </td>

                  <td>
                    <span>{status}</span>
                  </td>

                  <td>
                    <Link href="/pharmacy/medicines">Update availability</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        <aside className={styles.tip}>
          <h2>
            <ShieldCheck size={20} /> Best Practices
          </h2>

          <p>
            Keeping medicine availability updated helps users find trusted
            pharmacies and know where to visit.
          </p>

          <Link href="/pharmacy/medicines">Update Medicines Now</Link>
        </aside>
      </section>
    </div>
  );
}

function Metric({
  icon,
  label,
  value,
  extra,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  extra?: ReactNode;
}) {
  return (
    <article className={styles.metric}>
      <span className={styles.metricIcon}>{icon}</span>

      <div>
        <p>{label}</p>

        <strong>{value}</strong>

        {extra}
      </div>
    </article>
  );
}
