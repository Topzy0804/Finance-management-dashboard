import React from "react";
import InvoiceForm from "../components/invoiceForm";

export default function NewInvoice() {
  return (
    <div className="page-content">
      <h2 style={{ margin: 0 }}>Create Invoice</h2>
      <div style={{ marginTop: 12 }}>
        <InvoiceForm />
      </div>
    </div>
  );
}
