import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PropertyDetail from "./pages/PropertyDetail";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminForm from "./pages/AdminForm";

function RrugaPrivate({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/admin/login" />;
}

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prona/:id" element={<PropertyDetail />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <RrugaPrivate>
                <AdminDashboard />
              </RrugaPrivate>
            }
          />
          <Route
            path="/admin/shto"
            element={
              <RrugaPrivate>
                <AdminForm />
              </RrugaPrivate>
            }
          />
          <Route
            path="/admin/edito/:id"
            element={
              <RrugaPrivate>
                <AdminForm />
              </RrugaPrivate>
            }
          />
        </Routes>
      </main>
    </>
  );
}
