"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useEffect, useState } from "react";
import {
  Activity,
  Menu,
  X,
  MapPin,
  Phone,
  Star,
  Check,
  Pill,
  DollarSign,
} from "lucide-react";

export default function MedicineDetailPage() {
  const medicine = {
    id: 1,
    name: "Paracetamol 500mg",
    category: "Pain Relief",
    price: "$2.50",
    description:
      "Paracetamol is used to treat mild to moderate pain and fever. It works by reducing the activity of the body's pain receptors.",
    dosage: "500 mg per tablet",
    usage: "Take 1-2 tablets every 4-6 hours, not to exceed 8 tablets per day",
    sideEffects: ["Rare allergic reactions", "Liver damage (at high doses)"],
    pharmacies: [
      {
        id: 1,
        name: "Health Plus Pharmacy",
        distance: "0.5 km",
        inStock: true,
      },
      { id: 2, name: "City Care Pharma", distance: "1.2 km", inStock: true },
      { id: 3, name: "Wellness Pharmacy", distance: "2.1 km", inStock: true },
    ],
  };

  return (
    <div className="detail-page">
      <Navbar />
      <main className="detail-main">
        <div className="detail-header">
          <Link href="/medicines" className="back-link">
            ← Back to Medicines
          </Link>
          <div className="detail-title">
            <h1>{medicine.name}</h1>
            <p className="detail-category">{medicine.category}</p>
          </div>
        </div>

        <div className="detail-container">
          <div className="detail-content">
            <section className="detail-section">
              <h2>About this Medicine</h2>
              <p>{medicine.description}</p>
            </section>

            <section className="detail-section">
              <h2>Dosage Information</h2>
              <div className="info-box">
                <div className="info-item">
                  <span className="info-label">Strength:</span>
                  <span className="info-value">{medicine.dosage}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Usage:</span>
                  <span className="info-value">{medicine.usage}</span>
                </div>
              </div>
            </section>

            <section className="detail-section">
              <h2>Side Effects</h2>
              <ul className="side-effects-list">
                {medicine.sideEffects.map((effect, idx) => (
                  <li key={idx}>{effect}</li>
                ))}
              </ul>
            </section>
          </div>

          <div className="detail-sidebar">
            <div className="price-card">
              <div className="price-display">
                <DollarSign size={20} />
                <span className="price-value">{medicine.price}</span>
              </div>
              <p className="price-note">Average price</p>
            </div>

            <section className="available-pharmacies">
              <h3>Available At</h3>
              <div className="pharmacies-list">
                {medicine.pharmacies.map((ph) => (
                  <Link
                    key={ph.id}
                    href={`/pharmacies/${ph.id}`}
                    className="pharmacy-item"
                  >
                    <div className="pharmacy-item-header">
                      <span className="pharmacy-name">{ph.name}</span>
                      {ph.inStock && (
                        <span className="in-stock-badge">In Stock</span>
                      )}
                    </div>
                    <div className="pharmacy-distance">
                      <MapPin size={14} />
                      {ph.distance}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
