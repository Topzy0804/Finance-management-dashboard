import React from "react";

export default function Register() {
  return (
    <div className="page-content auth-page">
      <div className="auth-left">
        <div className="auth-card">
          <div className="auth-brand">
            <div className="logo">
              <img src="assets/logo(1).png" alt="brand logo" />
            </div>
          </div>

          <div className="login-form">
            <div className="login-header">
              <h1>Create new account</h1>
              <p className="muted">Welcome back! Please enter your details</p>
            </div>
            <form className="form-stack" action="#">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" name="name" required />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" required />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />
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
                Already have an account? <a href="#">Sign in</a>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="hero-wrap">
          <img src="assets/image.png" alt="hero" />
        </div>
      </div>
    </div>
  );
}
