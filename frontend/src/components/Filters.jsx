export default function Filters({ filtra, ndrysho, pastro }) {
  return (
    <div className="filters">
      <input
        type="text"
        name="kerko"
        placeholder="Kerko..."
        value={filtra.kerko}
        onChange={ndrysho}
      />
      <input
        type="text"
        name="lokacioni"
        placeholder="Lokacioni"
        value={filtra.lokacioni}
        onChange={ndrysho}
      />
      <select name="lloji" value={filtra.lloji} onChange={ndrysho}>
        <option value="">Te gjitha llojet</option>
        <option value="shtepi">Banesë</option>
        <option value="banese">Banesë</option>
        <option value="toke">Banesë</option>
      </select>
      <select name="qellimi" value={filtra.qellimi} onChange={ndrysho}>
        <option value="">Shitje & Qera</option>
        <option value="shitje">Shitje</option>
        <option value="qera">Qera</option>
      </select>
      <input
        type="number"
        name="cmimiMin"
        placeholder="Cmimi min"
        value={filtra.cmimiMin}
        onChange={ndrysho}
      />
      <input
        type="number"
        name="cmimiMax"
        placeholder="Cmimi max"
        value={filtra.cmimiMax}
        onChange={ndrysho}
      />
      <button onClick={pastro} className="btn-secondary">
        Pastro
      </button>
    </div>
  );
}
