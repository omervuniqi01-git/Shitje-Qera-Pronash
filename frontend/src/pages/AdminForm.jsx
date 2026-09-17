import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { merrNjeProne, krijoProne, perditesoProne, fotoNeBase64 } from "../store";

const fillestar = {
  titulli: "",
  pershkrimi: "",
  cmimi: "",
  lloji: "banese",
  qellimi: "shitje",
  lokacioni: "",
  siperfaqja: "",
  dhoma: "",
  banjo: "",
  telefoni: "",
  whatsapp: "",
  latitude: "",
  longitude: "",
  fotot: [],
};

export default function AdminForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [forma, setForma] = useState(fillestar);

  useEffect(() => {
    if (!id) return;
    const p = merrNjeProne(id);
    if (p) setForma({ ...fillestar, ...p });
  }, [id]);

  const ndrysho = (e) => {
    setForma({ ...forma, [e.target.name]: e.target.value });
  };

  const dergo = (e) => {
    e.preventDefault();
  
    // 1. Ktheji vlerat numerike (cmimi, siperfaqja, dhoma, banjo, latitude, longitude) ne Number
    // 2. Perdor fotoNeBase64(file) per t'i kthyer fotot e ngarkuara ne string dhe ruaji te forma.fotot
    // 3. Nese ka id -> perditesoProne(id, forma), perndryshe krijoProne(forma)
    // 4. Pas ruajtjes: navigate("/admin")
  };

  return (
    <div className="form-wrap">
      <h1>{id ? "Edito pronen" : "Shto prone te re"}</h1>
      <p className="error">Kjo faqe eshte per t'u perfunduar nga nxenesi (ruajtja e formes dhe upload i fotove).</p>
      <form onSubmit={dergo} className="form">
        <input name="titulli" placeholder="Titulli" value={forma.titulli} onChange={ndrysho} required />
        <textarea name="pershkrimi" placeholder="Pershkrimi" value={forma.pershkrimi} onChange={ndrysho} required />
        <div className="row">
          <input name="cmimi" type="number" placeholder="Cmimi (€)" value={forma.cmimi} onChange={ndrysho} required />
          <input name="lokacioni" placeholder="Lokacioni" value={forma.lokacioni} onChange={ndrysho} required />
        </div>
        <div className="row">
          <select name="lloji" value={forma.lloji} onChange={ndrysho}>
            <option value="shtepi">Shtepi</option>
            <option value="banese">Banese</option>
            <option value="toke">Toke</option>
          </select>
          <select name="qellimi" value={forma.qellimi} onChange={ndrysho}>
            <option value="shitje">Shitje</option>
            <option value="qera">Qera</option>
          </select>
        </div>
        <div className="row">
          <input name="siperfaqja" type="number" placeholder="Siperfaqja (m²)" value={forma.siperfaqja} onChange={ndrysho} />
          <input name="dhoma" type="number" placeholder="Dhoma" value={forma.dhoma} onChange={ndrysho} />
          <input name="banjo" type="number" placeholder="Banjo" value={forma.banjo} onChange={ndrysho} />
        </div>
        <div className="row">
          <input name="telefoni" placeholder="Telefoni" value={forma.telefoni} onChange={ndrysho} />
          <input name="whatsapp" placeholder="WhatsApp (p.sh. 38344xxxxxx)" value={forma.whatsapp} onChange={ndrysho} />
        </div>
        <div className="row">
          <input name="latitude" type="number" step="any" placeholder="Latitude (opsionale)" value={forma.latitude} onChange={ndrysho} />
          <input name="longitude" type="number" step="any" placeholder="Longitude (opsionale)" value={forma.longitude} onChange={ndrysho} />
        </div>

        <label className="file-label">
          Ngarko foto
          <input type="file" multiple accept="image/*" />
        </label>

        <button type="submit" className="btn">{id ? "Ruaj ndryshimet" : "Shto pronen"}</button>
      </form>
    </div>
  );
}
