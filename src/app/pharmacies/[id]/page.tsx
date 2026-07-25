"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  MapPin,
  Phone,
  Building2,
  Navigation,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Pharmacy } from "@/types/pharmacy";
import { getPharmacyId } from "@/actions/pharmacy";
import { useParams } from "next/navigation";

export default function PharmacyDetailPage() {
  const { id } = useParams();
  const [liked, setLiked] = useState(false);
  const [pharmacy, setPharmacy] = useState<Pharmacy | null>(null);

  useEffect(() => {
    const pharmacyData = async () => {
      const result = await getPharmacyId(Number(id));
      setPharmacy(result);
    };
    pharmacyData();
  }, [id]);

  if (!pharmacy) {
    return <p>Loading...</p>;
  }
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

            <span
              className={`stock-badge ${
                pharmacy.approved ? "in-stock" : "limited"
              }`}
            >
              {pharmacy.approved ? (
                <>
                  <CheckCircle2 size={16} />
                  Verified Pharmacy
                </>
              ) : (
                <>
                  <AlertCircle size={16} />
                  Pending Approval
                </>
              )}
            </span>
          </div>
        </div>

        <div className="detail-container">
          <div className="detail-content">
            <section className="detail-section">
              <h2>Pharmacy Information</h2>

              <div className="pharmacy-info">
                <div className="info-row">
                  <MapPin size={18} />
                  <span>{pharmacy.address}</span>
                </div>

                <div className="info-row">
                  <Building2 size={18} />
                  <span>{pharmacy.city}</span>
                </div>

                <div className="info-row">
                  <Phone size={18} />
                  <span>{pharmacy.phone ?? "No phone available"}</span>
                </div>

                <div className="info-row">
                  <Navigation size={18} />
                  <span>
                    {pharmacy.latitude && pharmacy.longitude
                      ? `${pharmacy.latitude.toFixed(
                          4,
                        )}, ${pharmacy.longitude.toFixed(4)}`
                      : "Location coordinates unavailable"}
                  </span>
                </div>
              </div>
            </section>

            <section className="detail-section">
              <h2>About This Pharmacy</h2>

              <p>
                This pharmacy is registered on Afalagi and provides medicine
                availability information to help users locate medicines nearby.
              </p>
            </section>
          </div>

          <div className="detail-sidebar">
            <div className="contact-card">
              <h3>Quick Information</h3>

              <div className="contact-item">
                <Phone size={18} />
                <a href={`tel:${pharmacy.phone}`}>{pharmacy.phone}</a>
              </div>

              <div className="contact-item">
                <MapPin size={18} />
                <p>
                  {pharmacy.address}
                  <br />
                  {pharmacy.city}
                </p>
              </div>

              <div className="contact-item">
                {pharmacy.approved ? (
                  <>
                    <CheckCircle2 size={18} />
                    <span className="open">Verified Pharmacy</span>
                  </>
                ) : (
                  <>
                    <AlertCircle size={18} />
                    <span className="closed">Pending Approval</span>
                  </>
                )}
              </div>
            </div>

            <button type="button" className="cta-button full-width">
              <Navigation size={18} />
              Get Directions
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
