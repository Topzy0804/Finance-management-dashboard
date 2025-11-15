import { useState } from "react";
import formatCurrency from "../utils/helpers";
// import { createRows } from "./../utils/db";

const emptyItem = () => ({
  id: Date.now() + Math.random(),
  description: "",
  qty: 1,
  price: 0,
});
export default function InvoiceForm() {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [clientName, setClientName] = useState("");
  const [date, setDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [items, setItems] = useState([emptyItem()]);
  const [taxPercent, setTaxPercent] = useState(0);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("Sent");

  const updateItem = (id, field, value) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id
          ? {
              ...it,
              // coerce qty/price to numbers (keep empty string if user clears input)
              [field]:
                field === "qty" || field === "price"
                  ? value === ""
                    ? ""
                    : Number(value)
                  : value,
            }
          : it
      )
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

  const handleSubmit = async (e) => {
    e?.preventDefault();

    const err = validate();
    if (err) {
      alert(err);
      return;
    }

    try {
      const invoiceDetails = {
        invoiceNumber: invoiceNumber.trim() || undefined,
        clientName: clientName.trim(),
        date,
        dueDate: dueDate || undefined,
        items: items.map((it) => ({
          description: (it.description || "").trim(),
          qty: Number(it.qty) || 0,
          price: Number(it.price) || 0,
          amount: (Number(it.qty) || 0) * (Number(it.price) || 0),
        })),
        taxPercent: Number(taxPercent) || 0,
        subtotal,
        taxAmount,
        total,
        notes: notes.trim() || undefined,
        status: status || undefined,
      };

      await createRows(import.meta.env.VITE_INVOICE_TABLE_ID, invoiceDetails);
      // reset form or show success
      alert("Invoice saved");
    } catch (saveErr) {
      console.error(saveErr);
      alert("Failed to save invoice");
    } finally {
    }
  };

  return (
    <form className="invoice-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="col">
          <label>Invoice #</label>
          <input
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
          />

          <label>Client Name</label>
          <input
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
          />

          <label>Notes</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>

        <div className="form-side">
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
            onChange={(e) => setTaxPercent(Number(e.target.value) || 0)}
            min={0}
          />
          <label>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Draft">Draft</option>
            <option value="Sent">Sent</option>
            <option value="Paid">Paid</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
      </div>

      <h3>Line items</h3>
      <table className="line-items-table">
        <thead>
          <tr>
            <th className="th-cell">Description</th>
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
                />
              </td>
              <td className="col-qty">
                <input
                  type="number"
                  min={0}
                  value={it.qty}
                  onChange={(e) => updateItem(it.id, "qty", e.target.value)}
                />
              </td>
              <td className="col-price">
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={it.price}
                  onChange={(e) => updateItem(it.id, "price", e.target.value)}
                />
              </td>
              <td className="col-price">
                {formatCurrency(
                  (Number(it.qty) || 0) * (Number(it.price) || 0)
                )}
              </td>
              <td className="col-action">
                <button type="button" onClick={() => removeItem(it.id)}>
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-sm">
        <button type="button" onClick={addItem}>
          Add item
        </button>
      </div>
      <div className="totals-row">
        <div>Subtotal: {formatCurrency(subtotal)}</div>
        <div>Tax: {formatCurrency(taxAmount)}</div>
        <div className="total-amount">Total: {formatCurrency(total)}</div>
      </div>

      <div className="mt-md">
        <button type="submit" >
        create Invoice
        </button>
      </div>
    </form>
  );
}
