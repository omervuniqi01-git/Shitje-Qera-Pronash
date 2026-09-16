import { useState, useEffect } from "react";
import { merrProna } from "../api";
import Filters from "../components/Filters";
import PropertyCard from "../components/PropertyCard";

const fillestar = {
  kerko: "",
  lokacioni: "",
  lloji: "",
  qellimi: "",
  cmimiMin: "",
  cmimiMax: "",
};

export default function Home() {
  const [prona, setProna] = useState([]);
  const [filtra, setFiltra] = useState(fillestar);
  const [duke, setDuke] = useState(true);

  const ngarko = async () => {
    setDuke(true);
    try {
      const params = {};
      Object.keys(filtra).forEach((k) => {
        if (filtra[k]) params[k] = filtra[k];
      });
      const { data } = await merrProna(params);
      setProna(data);
    } catch (error) {
      setProna([]);
    } finally {
      setDuke(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(ngarko, 300);
    return () => clearTimeout(t);
  }, [filtra]);

  const ndrysho = (e) => {
    setFiltra({ ...filtra, [e.target.name]: e.target.value });
  };

  const pastro = () => setFiltra(fillestar);

  return (
    <div>
      <h1>Prona ne shitje dhe me qera</h1>
      <Filters filtra={filtra} ndrysho={ndrysho} pastro={pastro} />
      {duke ? (
        <p>Duke ngarkuar...</p>
      ) : prona.length === 0 ? (
        <p>Nuk u gjet asnje prone.</p>
      ) : (
        <div className="grid">
          {prona.map((p) => (
            <PropertyCard key={p._id} prona={p} />
          ))}
        </div>
      )}
    </div>
  );
}
