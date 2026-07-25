"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Phone,
  CheckCircle2,
  XCircle,
  Building2,
  Navigation,
} from "lucide-react";
import { getPharmacy } from "@/actions/pharmacy";
import { Pharmacy } from "@/types/pharmacy";

export default function PharmaciesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("distance");
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    setSearchTerm(searchParams.get("search") ?? "");

    const listPharm = async () => {
      const result = await getPharmacy();
      setPharmacies(result);
    };
    listPharm();
  }, [searchParams]);

  const filtered = pharmacies
    .filter((ph) => ph.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case "az":
          return a.name.localeCompare(b.name);

        case "za":
          return b.name.localeCompare(a.name);

        case "newest":
          return b.id - a.id;

        case "oldest":
          return a.id - b.id;

        default:
          return 0;
      }
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
            <option value="az">Name (A–Z)</option>
            <option value="za">Name (Z–A)</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
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
                    <div>
                      <h3>{ph.name}</h3>

                      <div className="info-row">
                        <Building2 size={15} />
                        <span>{ph.city}</span>
                      </div>
                    </div>

                    <div
                      className={`stock-badge ${ph.approved ? "in-stock" : "limited"}`}
                    >
                      {ph.approved ? (
                        <div
                          style={{
                            display: "flex",
                            gap: "5px",
                          }}
                        >
                          <CheckCircle2 size={16} />
                          Verified
                        </div>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            gap: "5px",
                          }}
                        >
                          <XCircle size={16} />
                          Pending
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pharmacy-info">
                    <div className="info-row">
                      <MapPin size={16} />
                      <span>{ph.address}</span>
                    </div>

                    <div className="info-row">
                      <Phone size={16} />
                      <span>{ph.phone ?? "No phone available"}</span>
                    </div>

                    <div className="info-row">
                      <Navigation size={16} />
                      <span>
                        {ph.latitude && ph.longitude
                          ? `${ph.latitude.toFixed(4)}, ${ph.longitude.toFixed(4)}`
                          : "Location not available"}
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
