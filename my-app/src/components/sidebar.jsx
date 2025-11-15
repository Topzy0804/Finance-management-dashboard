import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Sidebar() {
  const items = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/transactions", label: "Transactions" },
    { to: "/invoices", label: "Invoices" },
    { to: "/wallets", label: "My Wallets" },
    { to: "/settings", label: "Settings" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-logo">
          <img src={logo} alt="Logo" />
        </div>
      </div>

      <nav className="sidebar-nav">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <span className="nav-icon">■</span>
            <span className="nav-label">{it.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <NavLink
          to="/help"
          className={({ isActive }) =>
            isActive ? "nav-item active" : "nav-item"
          }
        >
          <span className="nav-icon">?</span>
          <span className="nav-label">Help</span>
        </NavLink>

        <button
          className="nav-item logout"
          onClick={() => alert("Logout (stub)")}
        >
          <span className="nav-icon">⇦</span>
          <span className="nav-label">Logout</span>
        </button>
      </div>
    </aside>
  );
}
