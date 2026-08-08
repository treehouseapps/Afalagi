"use client";

import { updatePharmacyAction } from "@/actions/pharmacy";
import { Pharmacy as PharmacyType } from "@/types/pharmacy";

type Pharmacy = PharmacyType;

type EditPharmacyModalProps = {
  open: boolean;
  onClose: () => void;
  pharmacy: Pharmacy | null;
  onSuccess: () => void;
};

export default function EditPharmacyModal({
  open,
  onClose,
  pharmacy,
  onSuccess,
}: EditPharmacyModalProps) {
  if (!open || !pharmacy) return null;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await updatePharmacyAction(new FormData(event.currentTarget));
    onClose();
    onSuccess();
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
            <h2 style={{ margin: 0 }}>Edit Approval</h2>
            <p style={{ marginTop: ".5rem", color: "#666" }}>
              Change approval status only. Other pharmacy data stays the same.
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
          <input type="hidden" name="id" value={pharmacy.id} />

          <div style={{ display: "grid", gap: "1.2rem" }}>
            <div>
              <label style={labelStyle}>Approval Status</label>
              <select
                name="approved"
                defaultValue={pharmacy.approved ? "true" : "false"}
                style={inputStyle}
              >
                <option value="false">Pending</option>
                <option value="true">Approved</option>
              </select>
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
            <button type="button" onClick={onClose} style={cancelButton}>
              Cancel
            </button>
            <button type="submit" style={saveButton}>
              Save Approval
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
