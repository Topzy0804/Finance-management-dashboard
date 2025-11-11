import { useState } from "react";
import formatCurrency from "../utils/helpers";

const emptyItem = () => ({
  id: Date.now() + Math.random(),
  description: "",
  qty: 1,
  price: 0,
});
export default function InvoiceForm({ onSubmit }) {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [clientName, setClientName] = useState("");
  const [date, setDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [items, setItems] = useState([emptyItem()]);
  const [taxPercent, setTaxPercent] = useState(0);
  const [notes, setNotes] = useState("");

  const updateItem = (id, field, value) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, [field]: value } : it))
    );
  };

  const addItem = () => setItems((prev) => [...prev, emptyItem()]);
  const removeItem = (id) =>
    setItems((prev) => prev.filter((it) => it.id !== id));

  const subtotal = items.reduce(
    (s, it) => s + (Number(it.qty) || 0) * (Number(it.price) || 0),
    0
  );
  const taxAmount = (subtotal * (Number(taxPercent) || 0)) / 100;
  const total = subtotal + taxAmount;

  const validate = () => {
    if (!clientName.trim()) return "Client name is required";
    if (!date) return "Invoice date is required";
    if (items.length === 0) return "Add at least one line item";
    for (const it of items) {
      if (!it.description.trim()) return "Each line item needs a description";
      if ((Number(it.qty) || 0) <= 0) return "Quantity must be greater than 0";
      if ((Number(it.price) || 0) < 0) return "Price cannot be negative";
    }
    return null;
  };

  const handleSubmit = (e) => {
    e && e.preventDefault();
    const err = validate();
    if (err) {
      alert(err);
      return;
    }

    const invoice = {
      invoiceNumber: invoiceNumber.trim() || undefined,
      clientName: clientName.trim(),
      date,
      dueDate: dueDate || undefined,
      items: items.map((it) => ({
        description: it.description.trim(),
        qty: Number(it.qty),
        price: Number(it.price),
      })),
      taxPercent: Number(taxPercent),
      subtotal,
      taxAmount,
      total,
      notes: notes.trim() || undefined,
    };

    if (onSubmit) onSubmit(invoice);
    else console.log("Invoice submitted", invoice);
  };

  return (
    <form
      className="invoice-form"
      onSubmit={handleSubmit}
      style={{ maxWidth: 900 }}
    >
      <div style={{ display: "flex", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <label>Invoice #</label>
          <input
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
          />

          <label>Client</label>
          <input
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
          />

          <label>Notes</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>

        <div style={{ width: 220 }}>
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <label>Due date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <label>Tax %</label>
          <input
            type="number"
            value={taxPercent}
            onChange={(e) => setTaxPercent(e.target.value)}
            min={0}
          />
        </div>
      </div>

      <h3>Line items</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Description</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.id}>
              <td>
                <input
                  value={it.description}
                  onChange={(e) =>
                    updateItem(it.id, "description", e.target.value)
                  }
                  style={{ width: "100%" }}
                />
              </td>
              <td style={{ width: 80 }}>
                <input
                  type="number"
                  min={0}
                  value={it.qty}
                  onChange={(e) => updateItem(it.id, "qty", e.target.value)}
                />
              </td>
              <td style={{ width: 120 }}>
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={it.price}
                  onChange={(e) => updateItem(it.id, "price", e.target.value)}
                />
              </td>
              <td style={{ width: 120 }}>
                {formatCurrency(
                  (Number(it.qty) || 0) * (Number(it.price) || 0)
                )}
              </td>
              <td style={{ width: 80 }}>
                <button type="button" onClick={() => removeItem(it.id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 8 }}>
        <button type="button" onClick={addItem}>
          Add item
        </button>
      </div>

      <div style={{ marginTop: 16, textAlign: "right" }}>
        <div>Subtotal: {formatCurrency(subtotal)}</div>
        <div>Tax: {formatCurrency(taxAmount)}</div>
        <div style={{ fontWeight: "bold" }}>Total: {formatCurrency(total)}</div>
      </div>

      <div style={{ marginTop: 18 }}>
        <button type="submit">Save invoice</button>
      </div>
    </form>
  );
}
