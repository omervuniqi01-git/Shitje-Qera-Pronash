import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../store";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gabim, setGabim] = useState("");

  const dergo = (e) => {
    e.preventDefault();
    setGabim("");
    if (login(email, password)) {
      navigate("/admin");
    } else {
      setGabim("Email ose fjalekalim i gabuar");
    }
  };

  return (
    <div className="form-wrap">
      <h1>Hyrje Admin</h1>
      <form onSubmit={dergo} className="form">
        {gabim && <p className="error">{gabim}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Fjalekalimi"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn">Hyr</button>
      </form>
    </div>
  );
}
