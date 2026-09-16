import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { merrNjeProne, krijoProne, perditesoProne, BASE_URL } from "../api";

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
};

export default function AdminForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [forma, setForma] = useState(fillestar);
  const [fotoTeReja, setFotoTeReja] = useState([]);
  const [fototEkzistuese, setFototEkzistuese] = useState([]);
  const [gabim, setGabim] = useState("");

  useEffect(() => {
    if (!id) return;
    (async () => {
      const { data } = await merrNjeProne(id);
      const pastruar = {};
      Object.keys(fillestar).forEach((k) => {
        pastruar[k] = data[k] != null ? data[k] : "";
      });
      setForma(pastruar);
      setFototEkzistuese(data.fotot || []);
    })();
  }, [id]);

  const ndrysho = (e) => {
    setForma({ ...forma, [e.target.name]: e.target.value });
  };

  const heqFoto = (foto) => {
    setFototEkzistuese(fototEkzistuese.filter((f) => f !== foto));
  };

  const dergo = async (e) => {
    e.preventDefault();
    setGabim("");
    try {
      const fd = new FormData();
      Object.keys(forma).forEach((k) => {
        if (forma[k] !== "") fd.append(k, forma[k]);
      });
      fotoTeReja.forEach((f) => fd.append("fotot", f));
      if (id) {
        fototEkzistuese.forEach((f) => fd.append("fototEkzistuese", f));
        await perditesoProne(id, fd);
      } else {
        await krijoProne(fd);
      }
      navigate("/admin");
    } catch (error) {
      setGabim(error.response?.data?.mesazhi || "Gabim gjate ruajtjes");
    }
  };

  return (
    <div className="form-wrap">
      <h1>{id ? "Edito pronen" : "Shto prone te re"}</h1>
      <form onSubmit={dergo} className="form">
        {gabim && <p className="error">{gabim}</p>}
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

        {fototEkzistuese.length > 0 && (
          <div className="existing-photos">
            {fototEkzistuese.map((f) => (
              <div key={f} className="existing-photo">
                <img src={`${BASE_URL}${f}`} alt="" />
                <button type="button" onClick={() => heqFoto(f)}>×</button>
              </div>
            ))}
          </div>
        )}

        <label className="file-label">
          Ngarko foto
          <input type="file" multiple accept="image/*" onChange={(e) => setFotoTeReja([...e.target.files])} />
        </label>

        <button type="submit" className="btn">{id ? "Ruaj ndryshimet" : "Shto pronen"}</button>
      </form>
    </div>
  );
}
