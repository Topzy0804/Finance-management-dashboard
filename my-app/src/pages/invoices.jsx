import React from "react";
import formatCurrency from "../utils/helpers";
import { Link } from "react-router-dom";

export default function Invoices() {
  const rows = [1, 2, 3, 4, 5, 6]; 

  return (
    <div className="page-content">
      <div className="invoices-header">
        <div>
          <h2 className="page-title">Invoices</h2>
        </div>

        <div className="header-controls">
          <div className="search">
            <input className="search-input" placeholder="Search invoices" />
          </div>
          <div>
          <Link className="btn-create" to="/new">
            Create Invoice
          </Link>
          <button className="ghost">Filters</button>
          </div>
        </div>
      </div>

      <div className="invoice-table table-card">
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
            {rows.map((r, i) => (
              <tr key={i} className="row-border">
                <td className="td-cell client-cell">
                  <div className="client-avatar-small">A</div>
                  <div>
                    <div className="strong">Client name {i + 1}</div>
                    <div className="small muted">Inv: MGL.{5200 + i}</div>
                  </div>
                </td>

                <td className="td-cell">
                  <div className="strong">14 Apr 2022</div>
                  <div className="small muted">at 8:00 PM</div>
                </td>

                <td className="td-cell">01</td>

                <td className="td-right">{formatCurrency(420.84)}</td>

                <td className="td-cell">
                  <span className="invoice-badge status-pending">Pending</span>
                </td>

                <td className="td-cell">
                  <Link className="btn-create" to="/preview">
            Veiw deatails
          </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
