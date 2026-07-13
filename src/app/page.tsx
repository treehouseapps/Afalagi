"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Clock,
  HeartHandshake,
  MapPin,
  Menu,
  Pill,
  Search,
  ShieldCheck,
  Store,
  X,
} from "lucide-react";

const HeroSection = () => {
  const [searchMedicine, setSearchMedicine] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  return (
    <section className="hero-shell">
      <div className="hero-orb orb-one" />
      <div className="hero-orb orb-two" />
      <div className="hero-orb orb-three" />

      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot" />
          Live updating pharmacy inventory in your area
        </div>

        <h1>
          Find your medicine. <br />
          <span>Fast and nearby.</span>
        </h1>
        <p>
          Don&apos;t waste time visiting empty pharmacies. Search our network to
          find exactly what you need, where you are.
        </p>

        <div className="search-panel">
          <div className="search-field">
            <Search size={18} />
            <input
              type="text"
              placeholder="Enter medicine name (e.g. Amoxicillin)"
              value={searchMedicine}
              onChange={(event) => setSearchMedicine(event.target.value)}
            />
          </div>

          <div className="search-field">
            <MapPin size={18} />
            <input
              type="text"
              placeholder="Your neighborhood"
              value={searchLocation}
              onChange={(event) => setSearchLocation(event.target.value)}
            />
            <button type="button" className="gps-button">
              <Activity size={16} /> Use GPS
            </button>
          </div>

          <button type="button" className="search-button">
            Search <ArrowRight size={18} />
          </button>
        </div>

        <div className="tag-row">
          <span>Trending:</span>
          {["Paracetamol", "Insulin", "Asthma Inhalers", "Vitamin C"].map(
            (term) => (
              <button key={term} type="button" className="tag-pill">
                {term}
              </button>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  const stats = [
    {
      icon: <Store size={28} />,
      count: "1,200+",
      label: "Verified Pharmacies",
    },
    { icon: <Pill size={28} />, count: "50,000+", label: "Medicines Listed" },
    { icon: <ShieldCheck size={28} />, count: "100%", label: "Authentic Data" },
    {
      icon: <Clock size={28} />,
      count: "< 5 mins",
      label: "Average Update Time",
    },
  ];

  return (
    <section className="stats-section">
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <h3>{stat.count}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <Search size={28} />,
      title: "Type your medicine",
      desc: "Enter the drug name, generic or brand, and your current location.",
      tone: "blue",
    },
    {
      icon: <MapPin size={28} />,
      title: "View matching pharmacies",
      desc: "See nearby pharmacies that currently have it in stock.",
      tone: "teal",
    },
    {
      icon: <CheckCircle2 size={28} />,
      title: "Reserve or navigate",
      desc: "Get directions instantly or call ahead to reserve your medication.",
      tone: "indigo",
    },
  ];

  return (
    <section className="steps-section">
      <div className="section-heading">
        <p>Simple Process</p>
        <h2>How Afalagi Works</h2>
      </div>

      <div className="steps-grid">
        {steps.map((step, index) => (
          <article key={index} className="step-card">
            <div className={`step-icon ${step.tone}`}>{step.icon}</div>
            <div className="step-number">{index + 1}</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

const B2BCtaSection = () => (
  <section className="cta-section">
    <div className="cta-card">
      <div className="cta-copy">
        <div className="cta-badge">
          <HeartHandshake size={16} /> For Pharmacy Owners
        </div>
        <h2>Grow your pharmacy. Help more patients.</h2>
        <p>
          Join the Afalagi network. List your inventory easily, reduce dead
          stock, and become the go-to pharmacy in your neighborhood.
        </p>
        <div className="cta-actions">
          <Link href="/register" className="cta-button primary">
            Register Your Pharmacy <ArrowRight size={18} />
          </Link>
          <Link href="/dashboard" className="cta-button secondary">
            Learn More
          </Link>
        </div>
      </div>

      <div className="cta-visual">
        <div className="visual-panel">
          <div className="visual-dots">
            <span />
            <span />
            <span />
          </div>
          <div className="visual-box" />
          <div className="visual-row" />
          <div className="visual-row small" />
        </div>
      </div>
    </div>
  </section>
);

export default function HomePage() {
  return (
    <div className="home-page">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <HowItWorksSection />
        <B2BCtaSection />
      </main>
      <Footer />
    </div>
  );
}
