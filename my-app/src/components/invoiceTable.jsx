import React from "react";
import formatCurrency from "../utils/helpers";

// InvoiceTable
// Props:
// - invoices: array of invoice objects { invoiceNumber, clientName, date, dueDate, total, status }
// - onView(invoice), onEdit(invoice), onDelete(invoice)
export default function InvoiceTable({
  invoices = [],
  onView,
  onEdit,
  onDelete,
}) {
  const fmtDate = (d) => {
    if (!d) return "-";
    try {
      return new Date(d).toLocaleDateString();
    } catch (e) {
      return d;
    }
  };

  const statusClass = (s) => {
    if (!s) return "status-unknown";
    return "status-" + s.toLowerCase();
  };

  return (
    <div className="invoice-table">
      {invoices.length === 0 ? (
        <div>No invoices yet.</div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: 8 }}>Invoice #</th>
              <th style={{ textAlign: "left", padding: 8 }}>Client</th>
              <th style={{ padding: 8 }}>Date</th>
              <th style={{ padding: 8 }}>Due</th>
              <th style={{ padding: 8, textAlign: "right" }}>Amount</th>
              <th style={{ padding: 8 }}>Status</th>
              <th style={{ padding: 8 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr
                key={inv.invoiceNumber ?? inv.id}
                style={{ borderTop: "1px solid #eee" }}
              >
                <td style={{ padding: 8 }}>{inv.invoiceNumber ?? "-"}</td>
                <td style={{ padding: 8 }}>{inv.clientName ?? "-"}</td>
                <td style={{ padding: 8 }}>{fmtDate(inv.date)}</td>
                <td style={{ padding: 8 }}>{fmtDate(inv.dueDate)}</td>
                <td style={{ padding: 8, textAlign: "right" }}>
                  {formatCurrency(inv.total ?? inv.subtotal ?? 0)}
                </td>
                <td style={{ padding: 8 }}>
                  <span
                    className={statusClass(inv.status)}
                    style={{
                      padding: "4px 8px",
                      borderRadius: 6,
                      background: "#f0f0f0",
                    }}
                  >
                    {inv.status ?? "Unknown"}
                  </span>
                </td>
                <td style={{ padding: 8 }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => onView && onView(inv)}>View</button>
                    <button onClick={() => onEdit && onEdit(inv)}>Edit</button>
                    <button onClick={() => onDelete && onDelete(inv)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
