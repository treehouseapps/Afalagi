"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Activity, Menu, X, Eye, EyeOff } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-page">
      <Navbar />
      <main className="auth-main">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <h1>Welcome Back</h1>
              <p>Sign in to your account to continue</p>
            </div>

            <form className="auth-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="form-row">
                <label htmlFor="remember" className="checkbox-label">
                  <input type="checkbox" id="remember" />
                  Remember me
                </label>
                <a href="#forgot" className="forgot-link">
                  Forgot password?
                </a>
              </div>

              <button type="submit" className="auth-submit">
                Sign In
              </button>
            </form>

            <div className="auth-divider">
              <span>Don&apos;t have an account?</span>
            </div>

            <Link href="/register" className="auth-switch">
              Create an account as Pharmacy Owner
            </Link>
          </div>

          <div className="auth-side">
            <div className="auth-side-content">
              <h2>Why join Afalagi?</h2>
              <ul className="benefit-list">
                <li>
                  <span>✓</span>
                  Real-time inventory management
                </li>
                <li>
                  <span>✓</span>
                  Reach more customers
                </li>
                <li>
                  <span>✓</span>
                  Reduce dead stock
                </li>
                <li>
                  <span>✓</span>
                  Easy order management
                </li>
                <li>
                  <span>✓</span>
                  Analytics and insights
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
