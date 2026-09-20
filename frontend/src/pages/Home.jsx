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


const pronatEFiltruara = (Array.isArray(pronat) ? pronat : []).filter((p) => {
  if (!p) return false;

  const kerkoMatch = !filtra?.kerko ||
    (p.titulli && p.titulli.toLowerCase().includes(filtra.kerko.toLowerCase().trim()));

  const lokacioniMatch = !filtra?.lokacioni ||
    (p.lokacioni && p.lokacioni.toLowerCase().includes(filtra.lokacioni.toLowerCase().trim()));

  const llojiMatch = !filtra?.lloji || p.lloji === filtra.lloji;

  const qellimiMatch = !filtra?.qellimi || p.qellimi === filtra.qellimi;

  const cmimiMinMatch = !filtra?.cmimiMin || Number(p.cmimi) >= Number(filtra.cmimiMin);

  const cmimiMaxMatch = !filtra?.cmimiMax || Number(p.cmimi) <= Number(filtra.cmimiMax);

  return kerkoMatch && lokacioniMatch && llojiMatch && qellimiMatch && cmimiMinMatch && cmimiMaxMatch;
});

const filtroProna = (lista, filtra) => {

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
