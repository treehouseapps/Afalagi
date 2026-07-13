"use client";

import { Pharmacy as PharmacyType } from "@/types/pharmacy";

type Pharmacy = PharmacyType;

type ViewModalProps = {
  open: boolean;
  onClose: () => void;
  pharmacy: Pharmacy | null;
};

export default function ViewModal({ open, onClose, pharmacy }: ViewModalProps) {
  if (!open || !pharmacy) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
        zIndex: 999,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "720px",
          background: "white",
          borderRadius: "18px",
          padding: "2rem",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <div>
            <h2 style={{ margin: 0 }}>View Pharmacy</h2>

            <p
              style={{
                marginTop: ".5rem",
                color: "#666",
              }}
            >
              View Pharmacy information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              border: "none",
              background: "transparent",
              fontSize: "1.5rem",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        <form>
          <input type="hidden" name="id" value={pharmacy.id} />

          <div
            style={{
              display: "grid",
              gap: "1.2rem",
            }}
          >
            <div>
              <label style={labelStyle}>Pharmacy Name</label>
              <input value={pharmacy.name} readOnly style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Owner ID</label>
              <input value={pharmacy.ownerId} readOnly style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Address</label>
              <input value={pharmacy.address} readOnly style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>City</label>
              <input value={pharmacy.city} readOnly style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Phone Number</label>
              <input value={pharmacy.phone} readOnly style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Latitude</label>
              <input value={pharmacy.latitude} readOnly style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Longitude</label>
              <input value={pharmacy.longitude} readOnly style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Approval Status</label>
              <input
                value={pharmacy.approved ? "Approved" : "Pending"}
                readOnly
                style={inputStyle}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "2rem",
            }}
          >
            <button type="button" onClick={onClose} style={cancelButton}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: ".4rem",
  fontWeight: 600,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: ".85rem",
  border: "1px solid #ddd",
  borderRadius: "10px",
  boxSizing: "border-box",
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  resize: "vertical",
};

const cancelButton: React.CSSProperties = {
  padding: ".8rem 1.4rem",
  border: "1px solid #ddd",
  background: "white",
  borderRadius: "10px",
  cursor: "pointer",
};
