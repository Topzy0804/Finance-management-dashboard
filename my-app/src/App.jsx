import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Invoices from "./pages/invoices";
import NewInvoice from "./pages/newInvoice";
import Sidebar from "./components/sidebar";
import InvoicePreview from "./pages/invoicePreview";
import Login from "./auth/login";
import Register from "./auth/register";

function AppLayout() {
  const location = useLocation();
  const hideSidebar = ["/login", "/register"].includes(location.pathname);

  return (
    <div className="app-root">
      <div className="app-layout">
        {!hideSidebar && <Sidebar />}

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
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </Router>
  );
}
