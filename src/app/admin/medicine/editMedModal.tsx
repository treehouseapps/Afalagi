"use client";

import { updateMedicineAction } from "@/actions/medicine";
import { Medicine as MedicineType } from "@/types/medicine";

type Medicine = MedicineType;

type EditMedicineModalProps = {
  open: boolean;
  onClose: () => void;
  medicine: Medicine | null;
};

export default function EditMedicineModal({
  open,
  onClose,
  medicine,
}: EditMedicineModalProps) {
  if (!open || !medicine) return null;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await updateMedicineAction(new FormData(event.currentTarget));
    onClose();
  }

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
            <h2 style={{ margin: 0 }}>Edit Medicine</h2>

            <p
              style={{
                marginTop: ".5rem",
                color: "#666",
              }}
            >
              Update medicine catalog information.
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

        <form onSubmit={handleSubmit}>
          <input type="hidden" name="id" value={medicine.id} />{" "}
          <div
            style={{
              display: "grid",
              gap: "1.2rem",
            }}
          >
            <div>
              <label style={labelStyle}>Medicine Name *</label>

              <input
                name="name"
                required
                defaultValue={medicine.name}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Generic Name</label>

              <input
                name="genericName"
                defaultValue={medicine.genericName ?? ""}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Category *</label>

              <input
                name="category"
                required
                defaultValue={medicine.category}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Manufacturer</label>

              <input
                name="manufacturer"
                defaultValue={medicine.manufacturer ?? ""}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Price</label>

              <input
                type="number"
                name="price"
                min="0"
                step="0.01"
                defaultValue={medicine.price ?? ""}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Description</label>

              <textarea
                name="description"
                rows={5}
                defaultValue={medicine.description ?? ""}
                style={textareaStyle}
              />
            </div>
          </div>{" "}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "1rem",
              marginTop: "2rem",
            }}
          >
            <button type="button" onClick={onClose} style={cancelButton}>
              Cancel
            </button>

            <button type="submit" style={saveButton}>
              Update Medicine
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

const saveButton: React.CSSProperties = {
  padding: ".8rem 1.4rem",
  border: "none",
  background: "#2563eb",
  color: "white",
  borderRadius: "10px",
  cursor: "pointer",
};
