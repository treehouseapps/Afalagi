"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Search, MapPin, Star, Filter } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useSearchParams } from "next/navigation";

export default function MedicinesPage() {
  const medicines = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      price: "$2.50",
      category: "Pain Relief",
      stock: "In Stock",
    },
    {
      id: 2,
      name: "Amoxicillin 250mg",
      price: "$4.80",
      category: "Antibiotics",
      stock: "In Stock",
    },
    {
      id: 3,
      name: "Ibuprofen 400mg",
      price: "$3.20",
      category: "Pain Relief",
      stock: "In Stock",
    },
    {
      id: 4,
      name: "Aspirin 100mg",
      price: "$1.90",
      category: "Pain Relief",
      stock: "Limited",
    },
    {
      id: 5,
      name: "Metformin 500mg",
      price: "$5.40",
      category: "Diabetes",
      stock: "In Stock",
    },
    {
      id: 6,
      name: "Lisinopril 10mg",
      price: "$6.20",
      category: "Blood Pressure",
      stock: "In Stock",
    },
    {
      id: 7,
      name: "Atorvastatin 20mg",
      price: "$7.10",
      category: "Cholesterol",
      stock: "In Stock",
    },
    {
      id: 8,
      name: "Omeprazole 20mg",
      price: "$4.50",
      category: "Gastric",
      stock: "In Stock",
    },
  ];

  const searchParams = useSearchParams();

  useEffect(() => {
    setSearchTerm(searchParams.get("search") ?? "");
  }, [searchParams]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Pain Relief",
    "Antibiotics",
    "Diabetes",
    "Blood Pressure",
    "Cholesterol",
    "Gastric",
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
                    <h3>{med.name}</h3>
                    <span
                      className={`stock-badge ${med.stock === "In Stock" ? "in-stock" : "limited"}`}
                    >
                      {med.stock}
                    </span>
                  </div>
                  <p className="item-category">{med.category}</p>
                  <div className="item-footer">
                    <span className="item-price">{med.price}</span>
                    <Link href={`/medicines/${med.id}`} className="item-link">
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
