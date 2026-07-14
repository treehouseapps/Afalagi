"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { X } from "lucide-react";

type Medicine = {
  id: string;
  name: string;
  category: string;
  manufacturer?: string;
  available: boolean;
};

type EditMedicineModalProps = {
  open: boolean;
  onClose: () => void;
  medicine: Medicine;
  onSave: (medicine: Medicine) => void;
};

export default function EditMedicineModal({
  open,
  onClose,
  medicine,
  onSave,
}: EditMedicineModalProps) {
  const [available, setAvailable] = useState(medicine.available);

  if (!open) return null;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSave({
      ...medicine,
      available,
    });
  }

  return (
    <div onClick={onClose} style={overlayStyle}>
      <div onClick={(event) => event.stopPropagation()} style={modalStyle}>
        <div style={headerStyle}>
          <div>
            <h2 style={{ margin: 0 }}>Edit Medicine</h2>

            <p style={descriptionStyle}>
              Update medicine availability for your pharmacy.
            </p>
          </div>

          <button type="button" onClick={onClose} style={closeButtonStyle}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={formStyle}>
            <div>
              <label style={labelStyle}>Medicine Name</label>

              <input value={medicine.name} disabled style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Category</label>

              <input value={medicine.category} disabled style={inputStyle} />
            </div>

            <div>
              <label style={labelStyle}>Manufacturer</label>

              <input
                value={medicine.manufacturer || "-"}
                disabled
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Availability</label>

              <select
                value={available ? "available" : "unavailable"}
                onChange={(event) =>
                  setAvailable(event.target.value === "available")
                }
                style={inputStyle}
              >
                <option value="available">Available</option>

                <option value="unavailable">Unavailable</option>
              </select>
            </div>
          </div>

          <div style={actionsStyle}>
            <button type="button" onClick={onClose} style={cancelButtonStyle}>
              Cancel
            </button>

            <button type="submit" style={saveButtonStyle}>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const overlayStyle: CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.45)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "1rem",
  zIndex: 999,
};

const modalStyle: CSSProperties = {
  width: "100%",
  maxWidth: "520px",
  background: "#fff",
  borderRadius: "18px",
  padding: "2rem",
  boxShadow: "0 10px 40px rgba(0,0,0,.2)",
};

const headerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "2rem",
};

const descriptionStyle: CSSProperties = {
  marginTop: ".5rem",
  color: "#666",
};

const closeButtonStyle: CSSProperties = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
};

const formStyle: CSSProperties = {
  display: "grid",
  gap: "1.25rem",
};

const labelStyle: CSSProperties = {
  display: "block",
  marginBottom: ".45rem",
  fontWeight: 600,
};

const inputStyle: CSSProperties = {
  width: "100%",
  padding: ".9rem",
  border: "1px solid #ddd",
  borderRadius: "10px",
  fontSize: "1rem",
  boxSizing: "border-box",
};

const actionsStyle: CSSProperties = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "1rem",
  marginTop: "2rem",
};

const cancelButtonStyle: CSSProperties = {
  padding: ".9rem 1.4rem",
  border: "1px solid #ddd",
  background: "#fff",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: 600,
};

const saveButtonStyle: CSSProperties = {
  padding: ".9rem 1.4rem",
  border: "none",
  background: "#2563eb",
  color: "#fff",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: 600,
};
