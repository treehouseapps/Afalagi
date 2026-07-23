"use client";

import { useState } from "react";
import { updateInventoryMedicine } from "@/actions/inventory";
import styles from "../../../pharmacy.module.css";

type Props = {
  medicine: {
    id: number;
    name: string;
    quantity: number;
    price: number | null;
    expiryDate: Date | null;
  };
};

export default function EditInventoryForm({ medicine }: Props) {
  const [quantity, setQuantity] = useState(medicine.quantity);

  const [price, setPrice] = useState(medicine.price ?? "");

  const [expiryDate, setExpiryDate] = useState(
    medicine.expiryDate ? medicine.expiryDate.toISOString().split("T")[0] : "",
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await updateInventoryMedicine({
      id: medicine.id,
      quantity: Number(quantity),
      price: price ? Number(price) : null,
      expiryDate: expiryDate ? new Date(expiryDate) : null,
    });

    alert("Updated successfully");
  }

  return (
    <div className={styles.page}>
      <article
        className={styles.card}
        style={{
          padding: "30px",
        }}
      >
        <div className={styles.formHeader}>
          <h2>Edit {medicine.name}</h2>
          <p>Update inventory information</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>

          <div className={styles.field}>
            <label>Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
            />
          </div>

          <div className={styles.field}>
            <label>Expiry Date</label>
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </div>

          <button type="submit" className={styles.primaryButton}>
            Save Changes
          </button>
        </form>
      </article>
    </div>
  );
}
