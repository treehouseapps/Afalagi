"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, Filter } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useSearchParams } from "next/navigation";
import { InventoryMedicine as medicineType } from "@/types/medicine";

type Props = {
  initialMedicines: medicineType[];
};

export default function MedicinesContent({ initialMedicines }: Props) {
  const [medicines, setMedicines] = useState<medicineType[]>(
    initialMedicines ?? [],
  );
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    setSearchTerm(searchParams.get("search") ?? "");
  }, [searchParams]);

  const categories = [
    "All",
    "Pain Relief",
    "Antibiotics",
    "Blood Pressure",
    "Diabetes",
    "Gastric",
    "Allergy",
    "Respiratory",
    "Vitamins & Supplements",
    "Antifungal",
  ];

  const filtered = medicines.filter((med) => {
    const matchesSearch = med.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || med.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="list-page">
      <Navbar />
      <main className="list-main">
        <div className="list-header">
          <h1>Find Medicines</h1>
          <p>Browse our comprehensive medicine database</p>
        </div>

        <div className="list-search-panel">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search by medicine name or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="list-container">
          <div className="filter-sidebar">
            <div className="filter-header">
              <Filter size={18} />
              <span>Categories</span>
            </div>
            <div className="filter-list">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-item ${selectedCategory === cat ? "active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="items-grid">
            {filtered.length === 0 ? (
              <div className="no-results">
                <p>No medicines found matching your criteria.</p>
              </div>
            ) : (
              filtered.map((med) => (
                <div key={med.id} className="item-card">
                  <div className="item-header">
                    <div>
                      <h3 className="item-title">{med.name}</h3>
                      <p className="item-category">{med.category}</p>
                    </div>

                    <span className="stock-badge in-stock">Available</span>
                  </div>

                  <div className="item-body">
                    <p className="item-manufacturer">
                      {med.manufacturer || "Unknown Manufacturer"}
                    </p>
                  </div>

                  <div className="item-footer">
                    <Link
                      href={`/medicines/${med.medicineId}`}
                      className="item-link"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
