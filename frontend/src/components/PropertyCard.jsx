import { Link } from "react-router-dom";
import { BASE_URL } from "../api";

export default function PropertyCard({ prona }) {
  const foto = prona.fotot && prona.fotot.length > 0 ? `${BASE_URL}${prona.fotot[0]}` : null;

  return (
    <Link to={`/prona/${prona._id}`} className="card">
      <div className="card-img">
        {foto ? <img src={foto} alt={prona.titulli} /> : <div className="no-img">Pa foto</div>}
        <span className="badge">{prona.qellimi === "qera" ? "Me qera" : "Ne shitje"}</span>
      </div>
      <div className="card-body">
        <h3>{prona.titulli}</h3>
        <p className="location">{prona.lokacioni}</p>
        <p className="price">{prona.cmimi.toLocaleString()} €{prona.qellimi === "qera" ? "/muaj" : ""}</p>
        <span className="type">{prona.lloji}</span>
      </div>
    </Link>
  );
}
