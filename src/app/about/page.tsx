"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { HeartHandshake, Store, Pill, MapPin } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="page about-page">
      <Navbar />
      <main>
        <section className="hero-shell about-hero">
          <div className="hero-orb orb-one" />
          <div className="hero-orb orb-two" />

          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot" /> About Afalagi
            </div>

            <h1>
              We're building faster access to medicine.
              <br />
              <span>Reliable. Local. Immediate.</span>
            </h1>

            <p>
              Afalagi connects patients to verified nearby pharmacies with live
              inventory updates so you can find essential medicines without the
              guesswork.
            </p>

            <div className="tag-row">
              <span>Our focus:</span>
              {["Availability", "Trust", "Speed"].map((t) => (
                <button key={t} type="button" className="tag-pill">
                  {t}
                </button>
              ))}
            </div>
          </div>
        </section>
        <section className="content-section">
          <div className="section-heading">
            <p>Our Mission</p>
            <h2>Make medicine discovery simple for everyone</h2>
          </div>

          <div className="about-grid">
            <article className="about-card">
              <div className="about-icon blue">
                <Store size={28} />
              </div>
              <h3>Verified Pharmacies</h3>
              <p>
                We partner with local pharmacies and provide tools to keep
                inventory accurate and up to date.
              </p>
            </article>

            <article className="about-card">
              <div className="about-icon teal">
                <Pill size={28} />
              </div>
              <h3>Comprehensive Listings</h3>
              <p>
                A wide catalogue of medicines including generics and brand
                names, searchable by name and location.
              </p>
            </article>

            <article className="about-card">
              <div className="about-icon indigo">
                <HeartHandshake size={28} />
              </div>
              <h3>Community-first</h3>
              <p>
                We work with pharmacists and patients to reduce wasted time and
                improve access to care in neighborhoods.
              </p>
            </article>
          </div>
        </section>
        <section className="cta-section">
          <div className="cta-card">
            <div className="cta-copy">
              <div className="cta-badge">
                <MapPin size={16} /> Get Started
              </div>
              <h2>Looking for medicine now?</h2>
              <p>
                Search nearby pharmacies or register your pharmacy to join
                Afalagi.
              </p>
              <div className="cta-actions">
                <Link href="/medicines" className="cta-button primary">
                  Search Medicines
                </Link>
                <Link href="/register" className="cta-button secondary">
                  Register Pharmacy
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
