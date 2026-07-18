import Link from "next/link";
import type { ReactNode } from "react";

import {
  Activity,
  ArrowUpRight,
  PackageSearch,
  ShieldCheck,
} from "lucide-react";

import styles from "./pharmacy.module.css";

import { getPharmacyDashboard } from "@/actions/pharmacy";

export default async function PharmacyDashboardPage() {
  const data = await getPharmacyDashboard();

  return (
    <div className={styles.page}>
      <section className={styles.metrics}>
        <Metric
          icon={<PackageSearch />}
          label="Total Medicines Listed"
          value={String(data.totalMedicines)}
        />

        <Metric
          icon={<Activity />}
          label="Recent Updates"
          value={String(data.medicines.length)}
          extra={
            <span className={styles.growth}>
              <ArrowUpRight size={13} />
              Recent
            </span>
          }
        />

        <Metric
          icon={<ShieldCheck />}
          label="Pharmacy Status"
          value={data.pharmacyStatus}
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
                <th>Stock</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {data.medicines.length === 0 ? (
                <tr>
                  <td colSpan={2}>No medicines added yet.</td>
                </tr>
              ) : (
                data.medicines.map((medicine) => (
                  <tr key={medicine.id}>
                    <td>
                      <strong>{medicine.name}</strong>
                    </td>

                    <td>{medicine.category}</td>

                    <td>{medicine.quantity}</td>

                    <td>
                      <Link href="/pharmacy/medicines">Update</Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </article>

        <aside className={styles.tip}>
          <h2>
            <ShieldCheck size={20} />
            Best Practices
          </h2>

          <p>
            Keep medicine quantity and availability updated so users can find
            your pharmacy easily.
          </p>

          <Link href="/pharmacy/medicines">Manage Medicines</Link>
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
