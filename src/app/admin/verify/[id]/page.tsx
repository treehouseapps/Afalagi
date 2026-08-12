import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import {
  approvePharmacyAction,
  rejectPharmacyAction,
} from "@/actions/pharmacy";

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
    where: {
      id: Number(params.id),
    },
    include: {
      owner: true,
    },
  });

  if (!pharmacy) {
    notFound();
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <Link href="/admin/verify">
        <button
          type="button"
          style={{
            padding: "0.7rem 1rem",
            marginBottom: "1.5rem",
          }}
        >
          ← Back
        </button>
      </Link>

      <h1>Pharmacy Verification Review</h1>

      <p style={{ marginTop: "0.5rem", color: "#666" }}>
        Review the pharmacy information and submitted verification document
        before making a decision.
      </p>

      {/* Pharmacy Information */}
      <section style={cardStyle}>
        <h2>Pharmacy Information</h2>

        <Info label="Pharmacy Name" value={pharmacy.name} />

        <Info label="Owner Name" value={pharmacy.owner.name} />

        <Info label="Phone" value={pharmacy.phone || "-"} />

        <Info label="Email" value={pharmacy.owner.email} />

        <Info label="Address" value={pharmacy.address} />

        <Info label="City" value={pharmacy.city} />

        <Info
          label="Verification Status"
          value={
            pharmacy.documentStatus === "APPROVED"
              ? "Approved"
              : pharmacy.documentStatus === "REJECTED"
                ? "Rejected"
                : pharmacy.documentStatus === "PENDING"
                  ? "Pending Review"
                  : "Document Missing"
          }
        />
      </section>

      {/* Verification Document */}
      <section style={cardStyle}>
        <h2>Verification Document</h2>

        {!pharmacy.documentUrl ? (
          <div
            style={{
              padding: "1rem",
              borderRadius: "10px",
              background: "#fff3cd",
              color: "#856404",
            }}
          >
            No verification document has been uploaded.
          </div>
        ) : (
          <div style={{ marginTop: "1rem" }}>
            <p style={{ color: "#666" }}>Submitted pharmacy document:</p>

            <div
              style={{
                marginTop: "1rem",
                padding: "1rem",
                border: "1px solid #ddd",
                borderRadius: "12px",
                background: "#fafafa",
              }}
            >
              <img
                src={pharmacy.documentUrl}
                alt={`Verification document for ${pharmacy.name}`}
                style={{
                  display: "block",
                  maxWidth: "100%",
                  maxHeight: "600px",
                  margin: "0 auto",
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />
            </div>

            <div style={{ marginTop: "1rem" }}>
              <a
                href={pharmacy.documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "0.7rem 1rem",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  textDecoration: "none",
                }}
              >
                Open Full Document
              </a>
            </div>
          </div>
        )}
      </section>

      {/* Rejection reason */}
      {pharmacy.rejectionReason && (
        <section style={cardStyle}>
          <h2>Rejection Reason</h2>

          <p style={{ color: "#555" }}>{pharmacy.rejectionReason}</p>
        </section>
      )}

      {/* Actions */}
      {pharmacy.documentUrl && pharmacy.documentStatus === "PENDING" && (
        <section
          style={{
            marginTop: "2rem",
            display: "flex",
            gap: "1rem",
          }}
        >
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
                cursor: "pointer",
              }}
            >
              Approve Document
            </button>
          </form>

          <form action={rejectPharmacyAction}>
            <input type="hidden" name="id" value={pharmacy.id} />

            <button
              type="submit"
              style={{
                padding: "0.8rem 1.5rem",
                background: "crimson",
                color: "white",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Reject Document
            </button>
          </form>
        </section>
      )}
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ marginTop: "0.8rem" }}>
      <strong>{label}</strong>

      <p
        style={{
          margin: "0.2rem 0",
          color: "#555",
        }}
      >
        {value}
      </p>
    </div>
  );
}

const cardStyle = {
  marginTop: "1.5rem",
  padding: "1.5rem",
  border: "1px solid #ddd",
  borderRadius: "18px",
};
