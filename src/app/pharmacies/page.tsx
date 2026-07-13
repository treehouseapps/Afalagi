"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useEffect, useState } from "react";
import { Search, MapPin, Star, Phone, Clock } from "lucide-react";

export default function PharmaciesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("distance");

  const pharmacies = [
    {
      id: 1,
      name: "Health Plus Pharmacy",
      address: "123 Main St",
      rating: 4.8,
      distance: "0.5 km",
      open: true,
      phone: "+1 555-0101",
    },
    {
      id: 2,
      name: "City Care Pharma",
      address: "456 Oak Ave",
      rating: 4.6,
      distance: "1.2 km",
      open: true,
      phone: "+1 555-0102",
    },
    {
      id: 3,
      name: "Wellness Pharmacy",
      address: "789 Pine Rd",
      rating: 4.9,
      distance: "2.1 km",
      open: true,
      phone: "+1 555-0103",
    },
    {
      id: 4,
      name: "MediCare Pharmacy",
      address: "321 Elm St",
      rating: 4.7,
      distance: "0.8 km",
      open: false,
      phone: "+1 555-0104",
    },
    {
      id: 5,
      name: "Quick Pharmacy",
      address: "654 Maple Dr",
      rating: 4.5,
      distance: "1.5 km",
      open: true,
      phone: "+1 555-0105",
    },
    {
      id: 6,
      name: "Premium Health",
      address: "987 Cedar Ln",
      rating: 4.8,
      distance: "2.3 km",
      open: true,
      phone: "+1 555-0106",
    },
  ];
  const searchParams = useSearchParams();

  useEffect(() => {
    setSearchTerm(searchParams.get("search") ?? "");
  }, [searchParams]);
  const filtered = pharmacies
    .filter((ph) => ph.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "distance") {
        return parseFloat(a.distance) - parseFloat(b.distance);
      } else if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });

  return (
    <div className="list-page">
      <Navbar />
      <main className="list-main">
        <div className="list-header">
          <h1>Find Pharmacies</h1>
          <p>Discover verified pharmacies near you</p>
        </div>

        <div className="list-search-panel">
          <div className="search-box">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search pharmacy name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="distance">Sort by Distance</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>

        <div className="list-container single-col">
          <div className="items-list">
            {filtered.length === 0 ? (
              <div className="no-results">
                <p>No pharmacies found matching your search.</p>
              </div>
            ) : (
              filtered.map((ph) => (
                <Link
                  key={ph.id}
                  href={`/pharmacies/${ph.id}`}
                  className="pharmacy-card"
                >
                  <div className="pharmacy-header">
                    <h3>{ph.name}</h3>
                    <div className="rating-badge">
                      <Star size={16} fill="#0f766e" color="#0f766e" />
                      <span>{ph.rating}</span>
                    </div>
                  </div>

                  <div className="pharmacy-info">
                    <div className="info-row">
                      <MapPin size={16} />
                      <span>{ph.address}</span>
                      <span className="distance">{ph.distance}</span>
                    </div>
                    <div className="info-row">
                      <Phone size={16} />
                      <span>{ph.phone}</span>
                    </div>
                    <div className="info-row">
                      <Clock size={16} />
                      <span className={ph.open ? "open" : "closed"}>
                        {ph.open ? "Open Now" : "Closed"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
