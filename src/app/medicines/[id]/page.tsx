"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Search,
  AlertCircle,
  Pill,
  Navigation2,
  Map as MapIcon,
  Activity,
  CheckCircle2,
  Info,
} from "lucide-react";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

const medicineData = {
  name: "Paracetamol 500mg",
  category: "Pain Relief & Fever",
  description:
    "Paracetamol is a common painkiller used to treat aches and pain. It can also be used to reduce a high temperature.",
  dosage:
    "Adults can take 1 or 2 tablets (500mg) every 4 to 6 hours. Do not take more than 8 tablets in 24 hours.",
  sideEffects:
    "Side effects are rare but can include allergic reactions (rash, swelling).",
};

const availablePharmacies = [
  {
    id: 1,
    name: "Health Plus Pharmacy",
    address: "Bole Road, Near Edna Mall, Addis Ababa",
    distance: "0.5 km",
    status: "In Stock",
    inStock: true,
  },
  {
    id: 2,
    name: "City Care Pharmacy",
    address: "Piassa, Churchill Ave, Addis Ababa",
    distance: "1.2 km",
    status: "In Stock",
    inStock: true,
  },
  {
    id: 3,
    name: "Sunrise Meds",
    address: "22 Mazoriya, Addis Ababa",
    distance: "2.8 km",
    status: "Low Stock",
    inStock: false,
  },
];

export default function MedicineDetailPage() {
  return (
    <div className="list-page">
      <Navbar />
      <main className="list-main">
        <div className="list-search-panel">
          {" "}
          <Link href="/medicines" className="back-link">
            <ArrowLeft size={18} />
            Back to Search Results
          </Link>
        </div>

        <div className="list-header">
          <p>{medicineData.category}</p>
          <h1>{medicineData.name}</h1>

          <div className="search-box">
            <Search size={20} />
            <span>
              Available in {availablePharmacies.length} Pharmacies Nearby
            </span>
          </div>
        </div>

        <div className="list-container single-col">
          <div className="filter-header">
            <div className="brand-icon">
              <MapPin size={24} />
            </div>
            <h2>Where You Can Buy It</h2>
          </div>

          <div className="items-list">
            {availablePharmacies.map((pharmacy) => (
              <div key={pharmacy.id} className="pharmacy-card">
                <div className="pharmacy-header">
                  <div>
                    <h3>{pharmacy.name}</h3>
                    <p className="info-row">
                      <MapPin size={14} /> {pharmacy.address}
                      <strong className="distance">{pharmacy.distance}</strong>
                    </p>
                  </div>

                  <div
                    className={`stock-badge ${pharmacy.inStock ? "in-stock" : "limited"}`}
                  >
                    {pharmacy.inStock ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <AlertCircle size={16} />
                    )}
                    {pharmacy.status}
                  </div>
                </div>

                <div className="item-footer">
                  <Link key={pharmacy.id} href={`/pharmacies/${pharmacy.id}`}>
                    <button className="nav-button ghost">View</button>
                  </Link>
                  <button className="nav-button primary">
                    <Navigation2 size={16} /> Dir
                  </button>
                </div>
              </div>
            ))}

            <div className="item-card">
              <div className="info-row">
                <MapIcon size={32} />
                <span>View on Map (Coming Soon)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="list-container single-col">
          <div className="filter-header">
            <Info size={20} />
            <h3>About this Medicine</h3>
          </div>

          <div className="items-grid">
            <div className="item-card">
              <div className="filter-header">
                <Pill size={20} /> Description
              </div>
              <p>{medicineData.description}</p>
            </div>

            <div className="item-card">
              <div className="filter-header">
                <Activity size={20} /> Dosage
              </div>
              <p>{medicineData.dosage}</p>
            </div>

            <div className="item-card">
              <div className="filter-header">
                <AlertCircle size={20} /> Side Effects
              </div>
              <p>{medicineData.sideEffects}</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
