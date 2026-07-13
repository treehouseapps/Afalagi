"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Activity,
  Menu,
  X,
  MapPin,
  Phone,
  Clock,
  Star,
  Heart,
  Share2,
} from "lucide-react";

export default function PharmacyDetailPage() {
  const [liked, setLiked] = useState(false);

  const pharmacy = {
    id: 1,
    name: "Health Plus Pharmacy",
    address: "123 Main St, Downtown",
    phone: "+1 555-0101",
    rating: 4.8,
    reviews: 342,
    open: true,
    hours: "Open 9:00 AM - 10:00 PM",
    description:
      "Your trusted neighborhood pharmacy with expert staff and comprehensive medicine selection.",
    services: [
      "Prescription Filling",
      "Over-the-Counter Meds",
      "Health Consultations",
      "Delivery Available",
    ],
    medicines: [
      { id: 1, name: "Paracetamol 500mg", price: "$2.50", inStock: true },
      { id: 2, name: "Ibuprofen 400mg", price: "$3.20", inStock: true },
      { id: 3, name: "Amoxicillin 250mg", price: "$4.80", inStock: true },
      { id: 4, name: "Aspirin 100mg", price: "$1.90", inStock: true },
    ],
  };

  return (
    <div className="detail-page">
      <Navbar />
      <main className="detail-main">
        <div className="detail-header">
          <Link href="/pharmacies" className="back-link">
            ← Back to Pharmacies
          </Link>
          <div className="detail-title">
            <h1>{pharmacy.name}</h1>
            <div className="rating-section">
              <div className="rating-display">
                <Star size={18} fill="#0f766e" color="#0f766e" />
                <span>{pharmacy.rating}</span>
                <span className="reviews-count">
                  ({pharmacy.reviews} reviews)
                </span>
              </div>
              <div className="action-buttons">
                <button
                  type="button"
                  className={`icon-button ${liked ? "liked" : ""}`}
                  onClick={() => setLiked(!liked)}
                >
                  <Heart size={18} fill={liked ? "#0f766e" : "none"} />
                </button>
                <button type="button" className="icon-button">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-container">
          <div className="detail-content">
            <section className="detail-section">
              <h2>About</h2>
              <p>{pharmacy.description}</p>
            </section>

            <section className="detail-section">
              <h2>Services</h2>
              <div className="services-grid">
                {pharmacy.services.map((service, idx) => (
                  <div key={idx} className="service-badge">
                    ✓ {service}
                  </div>
                ))}
              </div>
            </section>

            <section className="detail-section">
              <h2>Medicines Available</h2>
              <div className="medicines-grid">
                {pharmacy.medicines.map((med) => (
                  <Link
                    key={med.id}
                    href={`/medicines/${med.id}`}
                    className="medicine-item"
                  >
                    <div className="medicine-header">
                      <span className="medicine-name">{med.name}</span>
                      {med.inStock && (
                        <span className="in-stock-badge">In Stock</span>
                      )}
                    </div>
                    <span className="medicine-price">{med.price}</span>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <div className="detail-sidebar">
            <div className="contact-card">
              <h3>Contact & Hours</h3>
              <div className="contact-item">
                <Phone size={18} />
                <a href={`tel:${pharmacy.phone}`}>{pharmacy.phone}</a>
              </div>
              <div className="contact-item">
                <Clock size={18} />
                <div>
                  <span
                    className={`status ${pharmacy.open ? "open" : "closed"}`}
                  >
                    {pharmacy.open ? "Open Now" : "Closed"}
                  </span>
                  <p>{pharmacy.hours}</p>
                </div>
              </div>
              <div className="contact-item">
                <MapPin size={18} />
                <p>{pharmacy.address}</p>
              </div>
            </div>

            <button type="button" className="cta-button full-width">
              Get Directions
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
