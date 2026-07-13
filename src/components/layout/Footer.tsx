"use client";

import { Activity } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="brand footer-brand">
          <div className="brand-icon">
            <Activity size={20} />
          </div>
          <span>afalagi</span>
        </div>

        <div className="footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#contact">Contact Support</a>
        </div>

        <p>© {new Date().getFullYear()} Afalagi. All rights reserved.</p>
      </div>
    </footer>
  );
}
