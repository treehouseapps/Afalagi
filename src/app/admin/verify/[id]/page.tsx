import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

export default function PharmacyVerificationDetailsPage({ params }: Props) {
  const { id } = params;

  const pharmacy = {
    id,
    name: "Green Care Pharmacy",
    ownerName: "Abebe Kebede",
    phone: "0912345678",
    address: "Bole Road",
    city: "Addis Ababa",

    digitalIdNumber: "100234567890",
    digitalIdImage: "/documents/sample-digital-id.jpg",

    tradeLicenseNumber: "TL-2026-00456",
    tradeLicenseImage: "/documents/sample-trade-license.jpg",

    pharmacyLicenseNumber: "PH-2026-00891",
    pharmacyLicenseImage: "/documents/sample-pharmacy-license.jpg",

    status: "Pending",
  };

  return (
    <main
      style={{
        padding: "2rem",
        fontFamily: "system-ui, sans-serif",
      }}
    >
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

      <p
        style={{
          marginTop: "0.5rem",
          color: "#666",
        }}
      >
        Review submitted documents before giving the verified badge.
      </p>

      <section style={cardStyle}>
        <h2>Pharmacy Information</h2>

        <Info label="Pharmacy Name" value={pharmacy.name} />

        <Info label="Owner Name" value={pharmacy.ownerName} />

        <Info label="Phone" value={pharmacy.phone} />

        <Info label="Address" value={pharmacy.address} />

        <Info label="City" value={pharmacy.city} />

        <Info label="Verification Status" value={pharmacy.status} />
      </section>

      <section style={cardStyle}>
        <h2>Digital ID</h2>

        <Info label="Digital ID Number" value={pharmacy.digitalIdNumber} />

        <DocumentPreview
          title="Digital ID Document"
          image={pharmacy.digitalIdImage}
        />
      </section>

      <section style={cardStyle}>
        <h2>Trade License</h2>

        <Info label="License Number" value={pharmacy.tradeLicenseNumber} />

        <DocumentPreview
          title="Trade License Document"
          image={pharmacy.tradeLicenseImage}
        />
      </section>

      <section style={cardStyle}>
        <h2>Pharmacy License</h2>

        <Info label="License Number" value={pharmacy.pharmacyLicenseNumber} />

        <DocumentPreview
          title="Pharmacy License Document"
          image={pharmacy.pharmacyLicenseImage}
        />
      </section>

      <section
        style={{
          display: "flex",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        <button
          type="button"
          style={{
            padding: "0.8rem 1.5rem",
            background: "green",
            color: "white",
            borderRadius: "8px",
            border: "none",
          }}
        >
          Approve Verification
        </button>

        <button
          type="button"
          style={{
            padding: "0.8rem 1.5rem",
            background: "crimson",
            color: "white",
            borderRadius: "8px",
            border: "none",
          }}
        >
          Reject
        </button>
      </section>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        marginTop: "0.8rem",
      }}
    >
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

function DocumentPreview({ title, image }: { title: string; image: string }) {
  return (
    <div
      style={{
        marginTop: "1.5rem",
      }}
    >
      <h3>{title}</h3>

      <img
        src={image}
        alt={title}
        style={{
          width: "100%",
          maxWidth: "500px",
          height: "300px",
          objectFit: "contain",
          border: "1px solid #ddd",
          borderRadius: "12px",
          marginTop: "0.8rem",
          background: "#fafafa",
        }}
      />
    </div>
  );
}

const cardStyle = {
  marginTop: "1.5rem",
  padding: "1.5rem",
  border: "1px solid #ddd",
  borderRadius: "18px",
};
