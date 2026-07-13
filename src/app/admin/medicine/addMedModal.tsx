"use client";

import { createMedicineAction } from "@/actions/medicine";

type AddMedicineModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function AddMedicineModal({
  open,
  onClose,
}: AddMedicineModalProps) {
  if (!open) return null;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await createMedicineAction(new FormData(event.currentTarget));
    onClose();
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
        zIndex: 999,
      }}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "720px",
          background: "#fff",
          borderRadius: "18px",
          padding: "2rem",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 10px 40px rgba(0,0,0,.2)",
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
            <h2
              style={{
                margin: 0,
              }}
            >
              Add New Medicine
            </h2>

            <p
              style={{
                marginTop: ".5rem",
                color: "#666",
              }}
            >
              Register a new medicine into the global medicine catalog.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: "1.4rem",
            }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {" "}
          <div
            style={{
              display: "grid",
              gap: "1.25rem",
            }}
          >
            <div>
              <label style={labelStyle}>Medicine Name *</label>

              <input
                type="text"
                name="name"
                required
                placeholder="Panadol 500mg"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Generic Name</label>

              <input
                type="text"
                name="genericName"
                placeholder="Paracetamol"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Category *</label>

              <input
                type="text"
                name="category"
                required
                placeholder="Analgesic"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Manufacturer</label>

              <input
                type="text"
                name="manufacturer"
                placeholder="GSK"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Price (Birr)</label>

              <input
                type="number"
                step="0.01"
                name="price"
                placeholder="10.00"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Description</label>

              <textarea
                rows={5}
                name="description"
                placeholder="Medicine description..."
                style={textareaStyle}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "1rem",
              marginTop: "2rem",
            }}
          >
            <button type="button" onClick={onClose} style={cancelButtonStyle}>
              Cancel
            </button>

            <button type="submit" style={saveButtonStyle}>
              Save Medicine
            </button>
          </div>{" "}
        </form>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: ".45rem",
  fontWeight: 600,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: ".9rem",
  border: "1px solid #ddd",
  borderRadius: "10px",
  fontSize: "1rem",
  outline: "none",
  boxSizing: "border-box",
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  resize: "vertical",
};

const cancelButtonStyle: React.CSSProperties = {
  padding: ".9rem 1.4rem",
  border: "1px solid #ddd",
  background: "#fff",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: 600,
};

const saveButtonStyle: React.CSSProperties = {
  padding: ".9rem 1.4rem",
  border: "none",
  background: "#2563eb",
  color: "#fff",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: 600,
};
