import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { merrProna, fshijProne } from "../store";

export default function AdminDashboard() {
  const [prona, setProna] = useState([]);

  useEffect(() => {
    setProna(merrProna());
  }, []);

  const fshij = (id) => {
    if (!window.confirm("Je i sigurt qe do ta fshish kete prone?")) return;
    fshijProne(id);
    setProna(merrProna());
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
          {prona.map((p) => (
            <tr key={p._id}>
              <td>
                {p.fotot?.[0] ? <img src={p.fotot[0]} alt="" className="table-img" /> : "—"}
              </td>
              <td>{p.titulli}</td>
              <td>{p.lloji}</td>
              <td>{p.qellimi}</td>
              <td>{p.cmimi.toLocaleString()} €</td>
              <td className="actions">
                <Link to={`/admin/edito/${p._id}`} className="btn-secondary">Edito</Link>
                <button onClick={() => fshij(p._id)} className="btn-danger">Fshij</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
