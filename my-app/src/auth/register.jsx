import React, { useState } from "react";
import { Link } from "react-router-dom";
import image from "../assets/image.png";
import logo from "../assets/logo.png";
// import { account, id } from "../appwrite";


export default function Register() {
  const [registerDetails, setRegisterDetails] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleUpdate = (e) => {
    setRegisterDetails({ ...registerDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { fullName, email, password } = registerDetails;
      await account.create(ID.unique(), email, password, fullName);
      alert(`Account created successfully for ${fullName}`);
      setRegisterDetails({ fullName: "", email: "", password: "" });
    } catch (error) {
      console.error("Error creating account:", error);
      alert(error?.message || "Failed to create account");
    }
  };

  return (
    <div className="page-content auth-page">
      <div className="auth-left">
        <div className="auth-card">
          <div className="auth-brand">
            <div className="logo">
              <img src={logo} alt="" />
            </div>
          </div>

          <div className="login-form">
            <div className="login-header">
              <h1>Create new account</h1>
              <p className="muted">Welcome back! Please enter your details</p>
            </div>
            <form onSubmit={handleSubmit} className="form-stack" action="#">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  onChange={handleUpdate}
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={registerDetails.fullName}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  onChange={handleUpdate}
                  type="email"
                  id="email"
                  name="email"
                  value={registerDetails.email}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  onChange={handleUpdate}
                  type="password"
                  id="password"
                  name="password"
                  value={registerDetails.password}
                  required
                />
              </div>

              <div className="form-checker">
                <label className="checkbox">
                  <input type="checkbox" id="remember" name="remember" />{" "}
                  Remember me
                </label>
                <a className="forgot" href="#">
                  Forgot password?
                </a>
              </div>

              <button type="submit" className="btn-cta">
                Create Account
              </button>

              <div className="form-remind small muted">
                Already have an account?{" "}
                <Link to="/login" className="nav-link">
                  Login here.
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="hero-wrap">
          <img src={image} alt="hero" />
        </div>
      </div>
    </div>
  );
}
