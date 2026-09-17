import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { merrNjeProne } from "../store";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function PropertyDetail() {
  const { id } = useParams();
  const [prona, setProna] = useState(null);
  const [fotoAktive, setFotoAktive] = useState(0);

  useEffect(() => {
    setProna(merrNjeProne(id) || null);
  }, [id]);

  if (!prona) return <p>Prona nuk u gjet. <Link to="/">Kthehu</Link></p>;

  const fotot = prona.fotot || [];
  const numri = (prona.whatsapp || prona.telefoni || "").replace(/[^0-9]/g, "");
  const teksti = encodeURIComponent(`Pershendetje, jam i interesuar per pronen: ${prona.titulli}`);

  return (
    <div className="detail">
      <Link to="/" className="back">← Kthehu</Link>
      <h1>{prona.titulli}</h1>
      <p className="location">{prona.lokacioni}</p>

      {fotot.length > 0 && (
        <div className="gallery">
          <img src={fotot[fotoAktive]} alt={prona.titulli} className="main-img" />
          {fotot.length > 1 && (
            <div className="thumbs">
              {fotot.map((f, i) => (
                <img
                  key={i}
                  src={f}
                  alt=""
                  className={i === fotoAktive ? "active" : ""}
                  onClick={() => setFotoAktive(i)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="detail-info">
        <p className="price">{prona.cmimi.toLocaleString()} €{prona.qellimi === "qera" ? "/muaj" : ""}</p>
        <div className="specs">
          <span>Lloji: {prona.lloji}</span>
          <span>Qellimi: {prona.qellimi}</span>
          {prona.siperfaqja > 0 && <span>{prona.siperfaqja} m²</span>}
          {prona.dhoma > 0 && <span>{prona.dhoma} dhoma</span>}
          {prona.banjo > 0 && <span>{prona.banjo} banjo</span>}
        </div>
        <p className="desc">{prona.pershkrimi}</p>

        <div className="contact">
          {numri && (
            <a
              href={`https://wa.me/${numri}?text=${teksti}`}
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp"
            >
              Kontakto ne WhatsApp
            </a>
          )}
          {prona.telefoni && <a href={`tel:${prona.telefoni}`} className="btn-secondary">Telefono</a>}
        </div>
      </div>

      {prona.latitude != null && prona.longitude != null && (
        <div className="map">
          <MapContainer center={[prona.latitude, prona.longitude]} zoom={15} style={{ height: "350px" }}>
            <TileLayer
              attribution="&copy; OpenStreetMap"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[prona.latitude, prona.longitude]}>
              <Popup>{prona.titulli}</Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </div>
  );
}
