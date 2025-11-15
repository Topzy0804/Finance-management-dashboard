import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../assets/image.png";
import logo from "../assets/logo.png";
// import { id, account } from "../appwrite";
// import { UserContext } from "./useContext";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [remember, setRemember] = useState(false);

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setLoginDetails((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await account.createEmailSession(
        loginDetails.email,
        loginDetails.password
      );
      const user = await account.get();
      setUser(user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      alert(error?.message || "Login failed");
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
              <h1>Welcome back</h1>
              <p className="muted">Welcome back! Please enter your details</p>
            </div>

            <form onSubmit={handleSubmit} className="form-stack">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  onChange={handleUpdate}
                  value={loginDetails.email}
                  type="email"
                  id="email"
                  name="email"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  onChange={handleUpdate}
                  value={loginDetails.password}
                  type="password"
                  id="password"
                  name="password"
                  required
                />
              </div>

              <div className="form-checker">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />{" "}
                  Remember me
                </label>
                <a className="forgot" href="#">
                  Forgot password?
                </a>
              </div>

              <button type="submit" className="btn-cta">
                Sign in
              </button>

              <div className="form-remind small muted">
                Don’t have an account?{" "}
                <Link to="/register" className="nav-link">
                  Sign up for free.
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
