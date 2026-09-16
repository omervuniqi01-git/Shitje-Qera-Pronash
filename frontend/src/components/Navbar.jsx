import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const dil = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Prona
      </Link>
      <div className="nav-links">
        <Link to="/">Ballina</Link>
        {token ? (
          <>
            <Link to="/admin">Paneli</Link>
            <button onClick={dil} className="btn-link">
              Dil
            </button>
          </>
        ) : (
          <Link to="/admin/login">Admin</Link>
        )}
      </div>
    </nav>
  );
}
