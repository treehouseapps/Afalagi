"use client";

import { useState } from "react";
import { updateInventoryMedicine } from "@/actions/inventory";

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
    <form onSubmit={handleSubmit}>
      <h2>Edit {medicine.name}</h2>

      <input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        placeholder="Quantity"
      />

      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
      />

      <input
        type="date"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
      />

      <button type="submit">Save</button>
    </form>
  );
}
