"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid email or password");
        return;
      }

      localStorage.setItem("mst_user", JSON.stringify(data.user));
      setSuccess("Login successful! Redirecting...");

      setTimeout(() => {
        router.push("/admin");
      }, 1000);

    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

              {/* Logo */}
              <div className="d-flex justify-content-center py-4">
                <Link href="/" className="logo d-flex align-items-center w-auto">
                  <img src="/assets/img/logo.png" alt="Logo" />
                  <span className="d-none d-lg-block">SoftCare OPD</span>
                </Link>
              </div>

              {/* Card */}
              <div className="card mb-3">
                <div className="card-body">

                  <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">
                      Login to Your Account
                    </h5>
                    <p className="text-center small">
                      Enter your email &amp; password to login
                    </p>
                  </div>

                  {/* ❌ Error Alert */}
                  {error && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                      {error}
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setError("")}
                      ></button>
                    </div>
                  )}

                  {/* ✅ Success Alert */}
                  {success && (
                    <div className="alert alert-success alert-dismissible fade show" role="alert">
                      {success}
                      <button
                        type="button"
                        className="btn-close"
                        onClick={() => setSuccess("")}
                      ></button>
                    </div>
                  )}

                  {/* Form */}
                  <form className="row g-3" onSubmit={handleLogin}>

                    {/* Email */}
                    <div className="col-12">
                      <label className="form-label">Email</label>
                      <div className="input-group">
                        <span className="input-group-text">@</span>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="col-12">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>

                    {/* Remember Me */}
                    <div className="col-12">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="rememberMe" />
                        <label className="form-check-label" htmlFor="rememberMe">
                          Remember me
                        </label>
                      </div>
                    </div>

                    {/* Button */}
                    <div className="col-12">
                      <button
                        className="btn btn-primary w-100"
                        type="submit"
                        disabled={submitting}
                      >
                        {submitting ? "Logging in..." : "Login"}
                      </button>
                    </div>

                    {/* Register */}
                    <div className="col-12">
                      <p className="small mb-0">
                        Don&apos;t have an account?{" "}
                        <Link href="/auth/register">Create an account</Link>
                      </p>
                    </div>

                  </form>

                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
