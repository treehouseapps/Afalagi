"use client";

import { Suspense, useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PharmacyList from "@/components/pharmacy/PharmacyList";
import { getPharmacy } from "@/actions/pharmacy";
import { PharmacyListItem } from "@/types/pharmacy";

export default function PharmaciesPage() {
  const [pharmacies, setPharmacies] = useState<PharmacyListItem[]>([]);
  useEffect(() => {
    const listPharm = async () => {
      const result = await getPharmacy();
      setPharmacies(result);
    };
    listPharm();
  }, []);
  return (
    <Suspense fallback={<div>Loading pharmacies...</div>}>
      <div className="list-page">
        <Navbar />
        <main className="list-main">
          <div className="list-header">
            <h1>Find Pharmacies</h1>
            <p>Discover verified pharmacies near you</p>
          </div>

          <PharmacyList Pharmacies={pharmacies} />
        </main>
        <Footer />
      </div>
    </Suspense>
  );
}
