import { useState, useEffect } from "react";
import { merrProna } from "../store";
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


const filtroProna = (lista, filtra) => {
  // 1. kerko      -> mbaj vetem pronat ku titulli permban tekstin (toLowerCase + includes)
  // 2. lokacioni  -> mbaj vetem pronat ku lokacioni permban tekstin
  // 3. lloji      -> perputhje e sakte: p.lloji === filtra.lloji
  // 4. qellimi    -> perputhje e sakte: p.qellimi === filtra.qellimi
  // 5. cmimiMin   -> p.cmimi >= Number(filtra.cmimiMin)
  // 6. cmimiMax   -> p.cmimi <= Number(filtra.cmimiMax)
  // Kujdes: aplikoji vetem filtrat qe kane vlere (jo bosh).
  // Tani po kthen gjithcka pa filtruar -> ndryshoje.
  return lista;
};

export default function Home() {
  const [prona, setProna] = useState([]);
  const [filtra, setFiltra] = useState(fillestar);

  useEffect(() => {
    const teGjitha = merrProna();
    setProna(filtroProna(teGjitha, filtra));
  }, [filtra]);

  const ndrysho = (e) => {
    setFiltra({ ...filtra, [e.target.name]: e.target.value });
  };

  const pastro = () => setFiltra(fillestar);

  return (
    <div>
      <h1>Prona ne shitje dhe me qera</h1>
      <p className="error">Filtrat jane per t'u perfunduar nga nxenesi (funksioni filtroProna ne Home.jsx).</p>
      <Filters filtra={filtra} ndrysho={ndrysho} pastro={pastro} />
      {prona.length === 0 ? (
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
