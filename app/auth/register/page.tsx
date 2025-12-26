"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthRegister() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Registered successfully");
      router.push("/auth/login");
    } else {
      alert(data.error || "Registration failed");
    }
  };

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
                      Create an Account
                    </h5>
                    <p className="text-center small">
                      Enter your personal details to create account
                    </p>
                  </div>

                  {/* Form */}
                  <form className="row g-3" onSubmit={submit}>

                    {/* Name */}
                    <div className="col-12">
                      <label className="form-label">Your Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="col-12">
                      <label className="form-label">Your Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        required
                      />
                    </div>

                    {/* Password */}
                    <div className="col-12">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={form.password}
                        onChange={(e) =>
                          setForm({ ...form, password: e.target.value })
                        }
                        required
                      />
                    </div>

                    {/* Terms */}
                    <div className="col-12">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="acceptTerms"
                          required
                        />
                        <label className="form-check-label" htmlFor="acceptTerms">
                          I agree and accept the{" "}
                          <a href="#">terms and conditions</a>
                        </label>
                      </div>
                    </div>

                    {/* Submit */}
                    <div className="col-12">
                      <button className="btn btn-primary w-100" type="submit">
                        Create Account
                      </button>
                    </div>

                    {/* Login Link */}
                    <div className="col-12">
                      <p className="small mb-0">
                        Already have an account?{" "}
                        <Link href="/">Log in</Link>
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
