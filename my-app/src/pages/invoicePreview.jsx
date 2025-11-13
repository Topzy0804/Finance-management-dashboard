import React from "react";
import formatCurrency from "../utils/helpers";

const sample = {
  company: {
    name: "Maglo.",
    email: "sales@maglo.com",
    addressLines: [
      "1333 Grey Fox Farm Road",
      "Houston, TX 77060",
      "Bloomfield Hills, Michigan(MI), 48301",
    ],
  },
  invoiceNumber: "MGL524874",
  billedTo: {
    name: "Sajib Rahman",
    company: "UIHUT Agency LTD",
    address: "3471 Rainy Day Drive Tulsa, USA",
    email: "rahmansajib@uihut.com",
  },
  items: [
    { id: 1, description: "Iphone 13 Pro Max", order: "01", rate: 244, qty: 1 },
    {
      id: 2,
      description: "Netflix Subscription",
      order: "01",
      rate: 420,
      qty: 1,
    },
  ],
  invoiceDate: "2022-04-14",
  dueDate: "2022-04-20",
};

function ItemsTable({ items }) {
  const subtotal = items.reduce(
    (s, it) => s + (it.rate || 0) * (it.qty || 0),
    0
  );
  const total = subtotal; // no tax/discount shown

  return (
    <div className="preview-items">
      <table className="preview-items-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Order/Type</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.id}>
              <td>
                <input
                  className="preview-input"
                  defaultValue={it.description}
                />
              </td>
              <td>
                <input
                  className="preview-input small"
                  defaultValue={it.order}
                />
              </td>
              <td className="text-right">{formatCurrency(it.rate)}</td>
              <td className="text-right">
                {formatCurrency((it.rate || 0) * (it.qty || 0))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="preview-totals">
        <div className="preview-totals-row">
          <div>Subtotal</div>
          <div>{formatCurrency(subtotal)}</div>
        </div>
        <div className="preview-totals-row">
          <div>Discount</div>
          <div className="muted">Add</div>
        </div>
        <div className="preview-totals-row">
          <div>Tax</div>
          <div className="muted">Add</div>
        </div>
        <div className="preview-totals-row total-row">
          <div>Total</div>
          <div>{formatCurrency(total)}</div>
        </div>
      </div>
    </div>
  );
}

export default function InvoicePreview() {
  const inv = sample;

  return (
    <div className="invoice-preview">
      <div className="preview-main">
        <div className="company-header">
          <div className="company-left">
            <div className="brand">{inv.company.name}</div>
            <div className="company-email">{inv.company.email}</div>
          </div>
          <div className="company-right">
            {inv.company.addressLines.map((l, i) => (
              <div key={i}>{l}</div>
            ))}
          </div>
        </div>

        <div className="invoice-meta">
          <div className="meta-left">
            <div className="meta-box">
              <div className="meta-title">Invoice Number</div>
              <div className="meta-value">{inv.invoiceNumber}</div>
              <div className="meta-sub">Issued Date: {inv.invoiceDate}</div>
              <div className="meta-sub">Due Date: {inv.dueDate}</div>
            </div>
          </div>

          <div className="meta-right">
            <div className="meta-box">
              <div className="meta-title">Billed to</div>
              <div className="meta-value">{inv.billedTo.name}</div>
              <div className="meta-sub">{inv.billedTo.company}</div>
              <div className="meta-sub">{inv.billedTo.address}</div>
            </div>
          </div>
        </div>

        <h3>Item Details</h3>
        <ItemsTable items={inv.items} />
      </div>

      <aside className="preview-sidebar">
        <div className="client-card">
          <div className="client-avatar">SR</div>
          <div className="client-info">
            <div className="client-name">{inv.billedTo.name}</div>
            <div className="client-company">{inv.billedTo.company}</div>
            <div className="client-email muted">{inv.billedTo.email}</div>
            <div className="client-address muted">{inv.billedTo.address}</div>
          </div>
        </div>

        <div className="info-card">
          <div className="info-row">
            <div>Invoice Date</div>
            <div>{inv.invoiceDate}</div>
          </div>
          <div className="info-row">
            <div>Due Date</div>
            <div>{inv.dueDate}</div>
          </div>

          <div className="info-actions">
            <button className="btn-primary full">Send Invoice</button>
            <div className="muted small center">
              <button className="ghost">Preview</button>
              <button className="ghost">Download</button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
