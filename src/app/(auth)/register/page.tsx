"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Activity, Menu, X, Eye, EyeOff, MapPin } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);

  return (
    <div className="auth-page">
      <Navbar />
      <main className="auth-main">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <h1>Join as Pharmacy Owner</h1>
              <p>Register your pharmacy and reach more customers</p>
            </div>

            <form className="auth-form">
              {step === 1 && (
                <>
                  <div className="form-group">
                    <label htmlFor="pharmacy-name">Pharmacy Name</label>
                    <input
                      type="text"
                      id="pharmacy-name"
                      placeholder="Your Pharmacy Name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="owner-name">Owner Name</label>
                    <input
                      type="text"
                      id="owner-name"
                      placeholder="Your Full Name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="you@pharmacy.com"
                      required
                    />
                  </div>

                  <button
                    type="button"
                    className="auth-submit"
                    onClick={() => setStep(2)}
                  >
                    Continue
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="form-group">
                    <label htmlFor="address">Pharmacy Address</label>
                    <input
                      type="text"
                      id="address"
                      placeholder="Street address"
                      required
                    />
                  </div>

                  <div className="form-row-input">
                    <div className="form-group">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        id="city"
                        placeholder="City"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="zip">Zip Code</label>
                      <input
                        type="text"
                        id="zip"
                        placeholder="Zip Code"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      placeholder="+1 (555) 000-0000"
                      required
                    />
                  </div>

                  <div className="form-row-buttons">
                    <button
                      type="button"
                      className="auth-submit secondary"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className="auth-submit"
                      onClick={() => setStep(3)}
                    >
                      Continue
                    </button>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="password-input-wrapper">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        placeholder="Create a strong password"
                        required
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                      type="password"
                      id="confirm-password"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>

                  <label htmlFor="terms" className="checkbox-label">
                    <input type="checkbox" id="terms" />I agree to the Terms of
                    Service and Privacy Policy
                  </label>

                  <div className="form-row-buttons">
                    <button
                      type="button"
                      className="auth-submit secondary"
                      onClick={() => setStep(2)}
                    >
                      Back
                    </button>
                    <button type="submit" className="auth-submit">
                      Create Account
                    </button>
                  </div>
                </>
              )}
            </form>

            <div className="auth-divider">
              <span>Already have an account?</span>
            </div>

            <Link href="/login" className="auth-switch">
              Sign in here
            </Link>
          </div>

          <div className="auth-side">
            <div className="auth-side-content">
              <h2>Get Started Today</h2>
              <ul className="benefit-list">
                <li>
                  <span>✓</span>
                  List your medicines instantly
                </li>
                <li>
                  <span>✓</span>
                  Update inventory in real-time
                </li>
                <li>
                  <span>✓</span>
                  Reach customers searching nearby
                </li>
                <li>
                  <span>✓</span>
                  Free setup and support
                </li>
                <li>
                  <span>✓</span>
                  Analytics dashboard included
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
