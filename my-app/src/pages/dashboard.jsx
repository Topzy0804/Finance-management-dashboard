import React from "react";
import formatCurrency from "../utils/helpers";

export default function Dashboard() {
  const summary = [
    { label: "Total invoice", value: 5240.21 },
    { label: "Amount Paid", value: 250.8 },
    { label: "Pending Payment", value: 550.25 },
  ];

  const recent = [1, 2, 3]; // placeholder rows

  return (
    <div className="page-content">
      <div className="page-header">
        <h2 className="page-title">Dashboard</h2>
        <div className="header-controls">
          <input className="search-input" placeholder="Search" />
        </div>
      </div>

      <section className="summary-section">
        <div className="summary-grid">
          {summary.map((s, i) => (
            <div
              key={i}
              className={`summary-card ${
                i === 0 ? "summary-card--highlight" : ""
              }`}
            >
              <div className="chart-header">
                <div>
                  <div className="summary-label">{s.label}</div>
                  <div className="summary-value">{formatCurrency(s.value)}</div>
                </div>
                <div className="summary-icon">{/* placeholder icon */}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3 className="section-heading">Working Capital</h3>
            <div>
              <div className="small muted">Income</div>
              <div className="small muted">Expenses</div>
            </div>
          </div>
          <div className="chart-placeholder">Chart placeholder</div>
        </div>
      </section>

      <section className="recent-section">
        <div className="page-header">
          <h3 className="section-heading">Recent Invoice</h3>
          <a href="#" className="view-all-link">
            View All
          </a>
        </div>

        <div className="table-card">
          <table className="table-full">
            <thead>
              <tr>
                <th className="th-cell">NAME/CLIENT</th>
                <th className="th-cell">DATE</th>
                <th className="th-cell">ORDERS/TYPE</th>
                <th className="th-cell th-right">AMOUNT</th>
                <th className="th-cell">STATUS</th>
                <th className="th-cell">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((r, i) => (
                <tr key={i} className="row-border">
                  <td className="td-cell client-cell">
                    <div className="client-avatar-small">G</div>
                    <div>
                      <div className="strong">Gadget Gallery LTD</div>
                      <div className="small muted">Inv: MGL524874</div>
                    </div>
                  </td>
                  <td className="td-cell">
                    <div className="strong">14 Apr 2022</div>
                    <div className="small muted">at 8:00 PM</div>
                  </td>
                  <td className="td-cell">20</td>
                  <td className="td-right">{formatCurrency(420.84)}</td>
                  <td className="td-cell">
                    <span className="invoice-badge status-pending">
                      Pending
                    </span>
                  </td>
                  <td className="td-cell">
                    <button className="ghost">•••</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
