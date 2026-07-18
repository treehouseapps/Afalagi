import Link from "next/link";
import styles from "./terms.module.css";

export default function TermsPage() {
  return (
    <main className={styles["terms-page"]}>
      <div className={styles["terms-container"]}>
        <h1>Afalagi Terms of Service</h1>

        <p>
          Welcome to Afalagi. By registering your pharmacy, you agree to follow
          these terms and conditions.
        </p>

        <section>
          <h2>1. Pharmacy Registration</h2>
          <p>
            Pharmacy owners must provide accurate information during
            registration, including pharmacy name, address, city, and contact
            information.
          </p>

          <p>
            Afalagi reserves the right to verify pharmacy information before
            approving an account.
          </p>
        </section>

        <section>
          <h2>2. Pharmacy Approval</h2>
          <p>
            All newly registered pharmacies are marked as pending until reviewed
            and approved by an administrator.
          </p>

          <p>
            A pharmacy cannot provide services through Afalagi until approval is
            completed.
          </p>
        </section>

        <section>
          <h2>3. Medicine Information</h2>
          <p>
            Pharmacy owners are responsible for maintaining accurate medicine
            inventory information, including availability and pricing.
          </p>

          <p>
            Providing incorrect medicine information may affect customer trust
            and may result in account restrictions.
          </p>
        </section>

        <section>
          <h2>4. User Safety</h2>
          <p>
            Afalagi helps users locate pharmacies and medicine availability.
            Users should always consult healthcare professionals before using
            any medicine.
          </p>
        </section>

        <section>
          <h2>5. Account Responsibility</h2>
          <p>
            Pharmacy owners are responsible for protecting their account
            credentials and all activities performed through their account.
          </p>
        </section>

        <section>
          <h2>6. Changes to Terms</h2>
          <p>
            Afalagi may update these terms when new features or policies are
            introduced. Continued use of the service means acceptance of the
            updated terms.
          </p>
        </section>

        <Link href="/register" className={styles["back-link"]}>
          Back to Registration
        </Link>
      </div>
    </main>
  );
}
