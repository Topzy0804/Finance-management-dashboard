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
    } catch {
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
        <table>
          <thead>
            <tr>
              <th className="th-left">Invoice #</th>
              <th className="th-left">Client</th>
              <th>Date</th>
              <th>Due</th>
              <th className="text-right">Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.invoiceNumber ?? inv.id} className="row-border">
                <td>{inv.invoiceNumber ?? "-"}</td>
                <td>{inv.clientName ?? "-"}</td>
                <td>{fmtDate(inv.date)}</td>
                <td>{fmtDate(inv.dueDate)}</td>
                <td className="text-right">
                  {formatCurrency(inv.total ?? inv.subtotal ?? 0)}
                </td>
                <td>
                  <span className={`${statusClass(inv.status)} invoice-badge`}>
                    {inv.status ?? "Unknown"}
                  </span>
                </td>
                <td>
                  <div className="invoice-actions">
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
