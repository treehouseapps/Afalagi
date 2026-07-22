"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { CreatePharmacy } from "@/actions/pharmacy";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [userName, setUserName] = useState("");
  const [pharmacyName, setPharmacyName] = useState("");
  const [pharmAddress, setPharmAddress] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const router = useRouter();
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!termsAccepted) {
      setError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    try {
      const result = await CreatePharmacy(
        userName,
        pharmacyName,
        pharmAddress,
        city,
        phone,
        email,
        password,
        cpassword,
      );
      if (!result.ok) {
        setError(result.error ?? "Unable to sign up. Please try again.");
        return;
      }
      router.push("/pharmacy");
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };
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

            <form className="auth-form" onSubmit={submit}>
              {step === 1 && (
                <>
                  <div className="form-group">
                    <label htmlFor="pharmacy-name">Your Full Name</label>
                    <input
                      value={userName}
                      onChange={(e) => {
                        setUserName(e.target.value);
                      }}
                      type="text"
                      id="pharmacy-name"
                      placeholder="Alex John"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pharmacy-name">Pharmacy Name</label>
                    <input
                      value={pharmacyName}
                      onChange={(e) => {
                        setPharmacyName(e.target.value);
                      }}
                      type="text"
                      id="pharmacy-name"
                      placeholder="Health Plus Pharmacy"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pharmacy-name">Email</label>
                    <input
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      type="text"
                      id="pharmacy-name"
                      placeholder="healthplus@gmail.com"
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
                    <label htmlFor="city">City</label>
                    <input
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                      type="text"
                      id="city"
                      placeholder="Addis Abeba"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="address">Pharmacy Address</label>
                    <input
                      value={pharmAddress}
                      onChange={(e) => {
                        setPharmAddress(e.target.value);
                      }}
                      type="text"
                      id="address"
                      placeholder="Bole Road, Near Edna Mall, Addis Ababa"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                      type="tel"
                      id="phone"
                      placeholder="+251 9XX XXX XXX"
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
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
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
                      value={cpassword}
                      onChange={(e) => {
                        setCPassword(e.target.value);
                      }}
                      type="password"
                      id="confirm-password"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>

                  <label htmlFor="terms" className="checkbox-label info-row">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                    />
                    I agree to the{" "}
                    <Link href="/terms" target="_blank" className="open">
                      Terms of Service
                    </Link>{" "}
                    and Privacy Policy
                  </label>
                  {error && (
                    <p role="alert" className="error-message">
                      {error}
                    </p>
                  )}

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
