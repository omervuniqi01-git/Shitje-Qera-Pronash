import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { merrProna, fshijProne } from "../store";

export default function AdminDashboard() {
  const [prona, setProna] = useState([]);

  useEffect(() => {
    // Sigurohemi qe te dhenat jane gjithmone Array
    const teGjitha = merrProna();
    setProna(Array.isArray(teGjitha) ? teGjitha : []);
  }, []);

  const fshij = (id) => {
    if (!window.confirm("Je i sigurt qe do ta fshish kete prone?")) return;
    fshijProne(id);

    // Perditësojmë listen pas fshirjes
    const teGjitha = merrProna();
    setProna(Array.isArray(teGjitha) ? teGjitha : []);
  };

  return (
    <div>
      <div className="dash-head">
        <h1>Paneli i Pronave</h1>
        <Link to="/admin/shto" className="btn">+ Shto prone</Link>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Foto</th>
            <th>Titulli</th>
            <th>Lloji</th>
            <th>Qellimi</th>
            <th>Cmimi</th>
            <th>Veprime</th>
          </tr>
        </thead>
        <tbody>
          {prona.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                Nuk ka asnje prone te regjistruar.
              </td>
            </tr>
          ) : (
            prona.map((p) => {
              if (!p) return null;

              // Id e sigurt (mbështet si _id ashtu edhe id)
              const idProne = p._id || p.id;

              return (
                <tr key={idProne}>
                  <td>
                    {p.fotot?.[0] ? (
                      <img src={p.fotot[0]} alt="" className="table-img" />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>{p.titulli || "—"}</td>
                  <td>{p.lloji || "—"}</td>
                  <td>{p.qellimi || "—"}</td>
                  <td>
                    {p.cmimi ? Number(p.cmimi).toLocaleString() : 0} €
                  </td>
                  <td className="actions">
                    <Link to={`/admin/edito/${idProne}`} className="btn-secondary">
                      Edito
                    </Link>
                    <button onClick={() => fshij(idProne)} className="btn-danger">
                      Fshij
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
