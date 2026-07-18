"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { login } from "@/actions/auth";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const result = await login(email, password);

      if (!result.ok) {
        setError(result.error ?? "Unable to sign in. Please try again.");
        return;
      }
      router.push(result.role === "ADMIN" ? "/admin" : "/pharmacy");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
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

            <form className="auth-form" onSubmit={submit}>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              {error && (
                <p role="alert" className="error-message">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="auth-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
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
