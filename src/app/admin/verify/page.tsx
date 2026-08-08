import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  approvePharmacyAction,
  rejectPharmacyAction,
} from "@/actions/pharmacy";
import { ConfirmActionButton } from "./ConfirmActionButton";

export const dynamic = "force-dynamic";

export default async function AdminPharmacyVerificationPage() {
  const pendingPharmacies = await prisma.pharmacy.findMany({
    where: { approved: false },
    orderBy: { createdAt: "desc" },
    include: { owner: true },
  });

  const approvedPharmacies = await prisma.pharmacy.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
    include: { owner: true },
    take: 4,
  });

  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>Pharmacy Verification</h1>

      <p style={{ maxWidth: "720px", marginTop: "0.5rem", color: "#555" }}>
        Review pending pharmacy requests and approve them from the database.
      </p>

      <section
        style={{ marginTop: "1.75rem", display: "grid", gap: "1.25rem" }}
      >
        <div
          style={{
            padding: "1.5rem",
            border: "1px solid #ddd",
            borderRadius: "18px",
          }}
        >
          <h2>Pending Verification Requests</h2>

          <p style={{ marginTop: "0.5rem", color: "#666" }}>
            These pharmacies are still waiting for approval.
          </p>

          <div style={{ marginTop: "1rem", display: "grid", gap: "1rem" }}>
            {pendingPharmacies.length === 0 ? (
              <p style={{ color: "#666" }}>No pending pharmacies.</p>
            ) : (
              pendingPharmacies.map((pharmacy) => (
                <div
                  key={pharmacy.id}
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
                      <p style={{ margin: 0, fontWeight: 700 }}>
                        {pharmacy.name}
                      </p>
                      <p style={{ margin: "0.25rem 0", color: "#666" }}>
                        {pharmacy.city}
                      </p>
                      <p style={{ margin: "0.25rem 0", color: "#666" }}>
                        {pharmacy.address}
                      </p>
                      <p style={{ margin: "0.25rem 0", color: "#666" }}>
                        {pharmacy.owner.email}
                      </p>
                    </div>

                    <div style={{ display: "flex", gap: "0.75rem" }}>
                      <Link href={`/admin/verify/${pharmacy.id}`}>
                        <button
                          type="button"
                          style={{ padding: "0.75rem 1rem" }}
                        >
                          View
                        </button>
                      </Link>

                      <form action={approvePharmacyAction}>
                        <input type="hidden" name="id" value={pharmacy.id} />
                        <ConfirmActionButton
                          action={approvePharmacyAction}
                          confirmText="Are you sure you want to approve this pharmacy?"
                          style={{ padding: "0.75rem 1rem" }}
                        >
                          Approve
                        </ConfirmActionButton>
                      </form>

                      <form action={rejectPharmacyAction}>
                        <input type="hidden" name="id" value={pharmacy.id} />
                        <ConfirmActionButton
                          action={rejectPharmacyAction}
                          confirmText="Are you sure you want to reject this pharmacy?"
                          style={{ padding: "0.75rem 1rem" }}
                        >
                          Reject
                        </ConfirmActionButton>
                      </form>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div
          style={{
            padding: "1.5rem",
            border: "1px solid #ddd",
            borderRadius: "18px",
          }}
        >
          <h2>Recently Approved</h2>

          <p style={{ marginTop: "0.5rem", color: "#666" }}>
            The latest pharmacies that were approved.
          </p>

          <div style={{ overflowX: "auto", marginTop: "1rem" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
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
                    Owner
                  </th>
                </tr>
              </thead>

              <tbody>
                {approvedPharmacies.map((item) => (
                  <tr key={item.id}>
                    <td style={{ padding: "0.75rem" }}>{item.name}</td>
                    <td style={{ padding: "0.75rem" }}>{item.city}</td>
                    <td style={{ padding: "0.75rem" }}>{item.owner.name}</td>
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
