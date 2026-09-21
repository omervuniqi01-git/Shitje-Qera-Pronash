import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { merrNjeProne, krijoProne, perditesoProne, fotoNeBase64 } from "../store";

const fillestar = {
  titulli: "",
  pershkrimi: "",
  cmimi: "",
  lloji: "banese",
  qellimi: "shitje",
  lokacioni: "lipjan",
  siperfaqja: "",
  dhoma: "4",
  banjo: "2",
  telefoni: "1",
  whatsapp: "044359208",
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
  
   
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    
      const formaEPerpunuar = {
        ...forma,
        cmimi: Number(forma.cmimi),
        siperfaqja: Number(forma.siperfaqja),
        dhoma: Number(forma.dhoma),
        banjo: Number(forma.banjo),
        latitude: Number(forma.latitude),
        longitude: Number(forma.longitude),
      };

      
      if (forma.fotot && forma.fotot.length > 0) {
        const fototInBase64 = await Promise.all(
          Array.from(forma.fotot).map((file) => fotoNeBase64(file))
        );
        formaEPerpunuar.fotot = fototInBase64;
      }


      if (id) {
        await perditesoProne(id, formaEPerpunuar);
      } else {
        await krijoProne(formaEPerpunuar);
      }

  
      navigate("/admin");

    } catch (error) {
      console.error("Gabim gjatë ruajtjes së pronës:", error);
    }
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
            <option value="shtepi">Banesë</option>
            <option value="banese">Banese</option>
            <option value="toke">Banesë</option>
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

        <div className="file-section">
          <label className="file-label" style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>
            Ngarko foto
            <input type="file" multiple accept="image/*" style={{ display: "block", marginTop: "5px" }} />
          </label>

          {/* Seksioni me foto të besueshme nga Unsplash */}
          <div className="preview-images" style={{ display: "flex", gap: "10px", marginTop: "10px", flexWrap: "wrap" }}>
            <div className="preview-images" style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <img src="https://www.godwinvaapts.com/wp-content/uploads/2022/06/lewisRender2.jpg" alt="Shembull 1" style={{ width: "100px", height: "80px", objectFit: "cover" }} />
              <img src="https://media.merrjep.com/Image/01f1d807-3089-4066-9349-04bac695ef37/20210930/0/0/toke-ndertimore-ne-rrugen-kryesore-te-fshatit.jpeg?AllowCropping=True" alt="Shembull 2" style={{ width: "100px", height: "80px", objectFit: "cover" }} />
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUIftwyntq2y5S3iQecJ5Uz4rzCIZ4w7mjeqNyvwoxQPfwOZrfDChKKBY&s=10" alt="Shembull 3" style={{ width: "100px", height: "80px", objectFit: "cover" }} />
            </div>
          </div>
        </div>

        <button type="submit" className="btn">{id ? "Ruaj ndryshimet" : "Shto pronen"}</button>
      </form>
    </div>
  );
}
