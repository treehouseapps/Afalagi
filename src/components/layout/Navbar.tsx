"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Activity, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-inner">
        <Link href="/" className="brand">
          <div className="brand-icon">
            <Activity size={22} />
          </div>
          <span>afalagi</span>
        </Link>

        <div className="nav-links">
          <Link href="/medicines">Find Medicine</Link>
          <Link href="/pharmacies">Pharmacies</Link>
          <Link href="/about">About Us</Link>
        </div>

        <div className="nav-actions">
          <Link href="/login" className="nav-button ghost">
            Log In
          </Link>
          <Link href="/register" className="nav-button primary">
            Join as Pharmacy
          </Link>
        </div>

        <button
          className="mobile-menu-button"
          onClick={() => setMobileMenuOpen((value) => !value)}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu">
          <Link href="/medicines">Find Medicine</Link>
          <Link href="/pharmacies">Pharmacies</Link>
          <Link href="/login">Log In</Link>
          <Link href="/register" className="mobile-cta">
            Join as Pharmacy
          </Link>
        </div>
      )}
    </nav>
  );
}
