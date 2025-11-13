import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Invoices from "./pages/invoices";
import NewInvoice from "./pages/newInvoice";
import Sidebar from "./components/sidebar";
import InvoicePreview from "./pages/invoicePreview";

export default function App() {
  return (
    <Router>
      <div className="app-root">
        <div className="app-layout">
          <Sidebar />

          <div className="app-main">
            <main>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/new" element={<NewInvoice />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/preview" element={<InvoicePreview />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}
