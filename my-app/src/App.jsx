import { useState } from "react";
import "./App.css";
import NewInvoice from "./pages/newInvoice";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="app-root" style={{ padding: 20 }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 18,
        }}
      >
        <h1>Finance App</h1>
        <nav>
          <button onClick={() => setPage("home")} style={{ marginRight: 8 }}>
            Home
          </button>
          <button onClick={() => setPage("new")}>New Invoice</button>
        </nav>
      </header>

      <main>
        {page === "home" && (
          <div>
            <h2>Welcome</h2>
            <p>Use the navigation to create a new invoice.</p>
          </div>
        )}

        {page === "new" && <NewInvoice />}
      </main>
    </div>
  );
}
