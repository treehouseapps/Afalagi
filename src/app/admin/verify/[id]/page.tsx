import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { approvePharmacyAction } from "@/actions/pharmacy";

type Props = {
  params: {
    id: string;
  };
};

export const dynamic = "force-dynamic";

export default async function PharmacyVerificationDetailsPage({
  params,
}: Props) {
  const pharmacy = await prisma.pharmacy.findUnique({
    where: { id: Number(params.id) },
    include: { owner: true },
  });

  if (!pharmacy) {
    notFound();
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <Link href="/admin/verify">
        <button
          type="button"
          style={{ padding: "0.7rem 1rem", marginBottom: "1.5rem" }}
        >
          ← Back
        </button>
      </Link>

      <h1>Pharmacy Verification Review</h1>

      <p style={{ marginTop: "0.5rem", color: "#666" }}>
        Review the pharmacy details before approving it.
      </p>

      <section style={cardStyle}>
        <h2>Pharmacy Information</h2>
        <Info label="Pharmacy Name" value={pharmacy.name} />
        <Info label="Owner Name" value={pharmacy.owner.name} />
        <Info label="Phone" value={pharmacy.phone || "-"} />
        <Info label="Address" value={pharmacy.address} />
        <Info label="City" value={pharmacy.city} />
        <Info
          label="Verification Status"
          value={pharmacy.approved ? "Approved" : "Pending"}
        />
      </section>

      <section style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
        {pharmacy.approved ? (
          <p style={{ color: "green" }}>This pharmacy is already approved.</p>
        ) : (
          <form action={approvePharmacyAction}>
            <input type="hidden" name="id" value={pharmacy.id} />
            <button
              type="submit"
              style={{
                padding: "0.8rem 1.5rem",
                background: "green",
                color: "white",
                borderRadius: "8px",
                border: "none",
              }}
            >
              Approve
            </button>
          </form>
        )}
      </section>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ marginTop: "0.8rem" }}>
      <strong>{label}</strong>
      <p style={{ margin: "0.2rem 0", color: "#555" }}>{value}</p>
    </div>
  );
}

const cardStyle = {
  marginTop: "1.5rem",
  padding: "1.5rem",
  border: "1px solid #ddd",
  borderRadius: "18px",
};
