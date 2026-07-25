"use client";

import React, { useEffect, useState } from "react";
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
import { getMedicineById } from "@/actions/medicine";
import { useParams } from "next/navigation";
import { getPharmacyList } from "@/actions/pharmacy";
import { InventoryPharmacy } from "@/types/medicine";

export default function MedicineDetailPage() {
  const { id } = useParams();

  const [medicineData, setMedicineData] = useState<any>(null);
  const [availablePharmacies, setAvailablePharmacies] = useState<
    InventoryPharmacy[]
  >([]);
  useEffect(() => {
    const fetchMedicine = async () => {
      if (!id) return;

      const [medicineRes, pharmacyRes] = await Promise.all([
        getMedicineById(Number(id)),
        getPharmacyList(Number(id)),
      ]);

      setMedicineData(medicineRes);
      setAvailablePharmacies(pharmacyRes.pharmacy || []);
    };

    fetchMedicine();
  }, [id]);

  if (!medicineData) {
    return <p>Loading...</p>;
  }
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
          <span className="category-pill">
            {medicineData[0].medicine.category}
          </span>

          <h1>{medicineData[0].medicine.name}</h1>

          <div className="search-box">
            <CheckCircle2 size={20} />
            <span>
              {/* Available at {availableCount} nearby{" "}
              {availableCount === 1 ? "pharmacy" : "pharmacies"} */}
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

              <p>{medicineData[0].medicine.description}</p>
            </div>

            <div className="item-card">
              <div className="filter-header">
                <Activity size={20} />
                <span>Recommended Dosage</span>
              </div>

              <p>{medicineData[0].medicine.dosage}</p>
            </div>

            <div className="item-card">
              <div className="filter-header">
                <AlertCircle size={20} />
                <span>Possible Side Effects</span>
              </div>

              <p>{medicineData[0].medicine.sideEffects}</p>
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
              availablePharmacies.map((pharmac) => (
                <div key={pharmac.pharmacy.id} className="pharmacy-card">
                  <div className="pharmacy-header">
                    <div>
                      <h3>{pharmac.pharmacy.name}</h3>

                      <div className="info-row">
                        <MapPin size={15} />
                        <span>{pharmac.pharmacy.address}</span>
                      </div>

                      <div className="info-row">
                        <Clock3 size={15} />
                        <span>{pharmac.pharmacy.distance} away</span>
                      </div>
                    </div>

                    {/* <div
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
                    </div> */}
                  </div>

                  <div className="item-footer">
                    <Link href={`/pharmacies/${pharmac.pharmacy.id}`}>
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
