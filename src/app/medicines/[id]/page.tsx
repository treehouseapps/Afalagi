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
  Building2,
  Clock3,
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
  const availableCount = availablePharmacies.filter((p) => p.inStock).length;

  return (
    <div className="list-page">
      <Navbar />

      <main className="list-main">
        <div className="list-search-panel">
          <Link href="/medicines" className="back-link">
            <ArrowLeft size={18} />
            Back to Medicines
          </Link>
        </div>

        <div className="list-header">
          <span className="category-pill">{medicineData.category}</span>

          <h1>{medicineData.name}</h1>

          <div className="search-box">
            <CheckCircle2 size={20} />
            <span>
              Available at {availableCount} nearby{" "}
              {availableCount === 1 ? "pharmacy" : "pharmacies"}
            </span>
          </div>
        </div>

        <div className="list-container single-col">
          <div className="filter-header">
            <Info size={20} />
            <h2>Medicine Information</h2>
          </div>

          <div className="items-grid">
            <div className="item-card">
              <div className="filter-header">
                <Pill size={20} />
                <span>Description</span>
              </div>

              <p>{medicineData.description}</p>
            </div>

            <div className="item-card">
              <div className="filter-header">
                <Activity size={20} />
                <span>Recommended Dosage</span>
              </div>

              <p>{medicineData.dosage}</p>
            </div>

            <div className="item-card">
              <div className="filter-header">
                <AlertCircle size={20} />
                <span>Possible Side Effects</span>
              </div>

              <p>{medicineData.sideEffects}</p>
            </div>
          </div>
        </div>

        <br />
        <br />

        <div className="list-container single-col">
          <div className="filter-header">
            <Building2 size={22} />
            <h2>Available at Nearby Pharmacies</h2>
          </div>

          <div className="items-list">
            {availablePharmacies.length === 0 ? (
              <div className="item-card">
                <div className="info-row">
                  <AlertCircle size={24} />
                  <span>
                    This medicine is currently unavailable at nearby pharmacies.
                  </span>
                </div>
              </div>
            ) : (
              availablePharmacies.map((pharmacy) => (
                <div key={pharmacy.id} className="pharmacy-card">
                  <div className="pharmacy-header">
                    <div>
                      <h3>{pharmacy.name}</h3>

                      <div className="info-row">
                        <MapPin size={15} />
                        <span>{pharmacy.address}</span>
                      </div>

                      <div className="info-row">
                        <Clock3 size={15} />
                        <span>{pharmacy.distance} away</span>
                      </div>
                    </div>

                    <div
                      className={`stock-badge ${
                        pharmacy.inStock ? "in-stock" : "limited"
                      }`}
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
                    <Link href={`/pharmacies/${pharmacy.id}`}>
                      <button className="nav-button ghost">
                        View Pharmacy
                      </button>
                    </Link>

                    <button className="nav-button primary">
                      <Navigation2 size={16} />
                      Directions
                    </button>
                  </div>
                </div>
              ))
            )}

            <div className="item-card">
              <div className="info-row">
                <MapIcon size={30} />
                <span>Interactive Map (Coming Soon)</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
