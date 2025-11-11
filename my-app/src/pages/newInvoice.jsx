import React from "react";
import InvoiceForm from "../components/invoiceForm";

export default function NewInvoice() {
  const handleSubmit = (invoice) => {
    // In a real app you'd send this to your backend or client-side store
    console.log("New invoice submitted:", invoice);
    alert("Invoice saved — check the console for the invoice object");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>New Invoice</h2>
      <InvoiceForm onSubmit={handleSubmit} />
    </div>
  );
}
