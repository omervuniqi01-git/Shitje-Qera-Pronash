const KEY = "prona";
const TOKEN_KEY = "token";

const ADMIN = {
  email: "admin@pronat.com",
  password: "admin123",
};

const shembuj = [
  {
    _id: "1",
    titulli: "Banese moderne ne qender",
    pershkrimi: "Banese e re me tre dhoma, e mobiluar, afer qendres tregtare.",
    cmimi: 89000,
    lloji: "banese",
    qellimi: "shitje",
    lokacioni: "Lipjan",
    siperfaqja: 82,
    dhoma: 3,
    banjo: 1,
    telefoni: "038000000",
    whatsapp: "38344111222",
    latitude: 42.6629,
    longitude: 21.1655,
    fotot: [],
    createdAt: Date.now() - 100000,
  },
  {
    _id: "2",
    titulli: "Shtepi me oborr",
    pershkrimi: "Shtepi dykateshe me oborr te madh dhe garazh.",
    cmimi: 500,
    lloji: "shtepi",
    qellimi: "qera",
    lokacioni: "Prishtine",
    siperfaqja: 160,
    dhoma: 5,
    banjo: 2,
    telefoni: "038111111",
    whatsapp: "38344333444",
    latitude: 42.3702,
    longitude: 21.1553,
    fotot: [],
    createdAt: Date.now() - 50000,
  },
  {
    _id: "3",
    titulli: "Toke ndertimore",
    pershkrimi: "Toke me leje ndertimi, qasje ne rruge kryesore.",
    cmimi: 25000,
    lloji: "toke",
    qellimi: "shitje",
    lokacioni: "Gjakove",
    siperfaqja: 500,
    dhoma: 0,
    banjo: 0,
    telefoni: "038222222",
    whatsapp: "38344555666",
    latitude: 42.4637,
    longitude: 21.4694,
    fotot: [],
    createdAt: Date.now(),
  },
];

const lexo = () => {
  try {
    const ruajtur = localStorage.getItem(KEY);
    if (ruajtur) return JSON.parse(ruajtur);
  } catch (e) {
    return [];
  }
  localStorage.setItem(KEY, JSON.stringify(shembuj));
  return shembuj;
};

const shkruaj = (prona) => {
  localStorage.setItem(KEY, JSON.stringify(prona));
};

export const merrProna = () => {
  return lexo().sort((a, b) => b.createdAt - a.createdAt);
};

export const merrNjeProne = (id) => lexo().find((p) => p._id === id);

export const krijoProne = (teDhena) => {
  const prona = lexo();
  const e_re = {
    ...teDhena,
    _id: Date.now().toString(),
    createdAt: Date.now(),
  };
  prona.push(e_re);
  shkruaj(prona);
  return e_re;
};

export const perditesoProne = (id, teDhena) => {
  const prona = lexo();
  const index = prona.findIndex((p) => p._id === id);
  if (index === -1) return null;
  prona[index] = { ...prona[index], ...teDhena, _id: id };
  shkruaj(prona);
  return prona[index];
};

export const fshijProne = (id) => {
  const prona = lexo().filter((p) => p._id !== id);
  shkruaj(prona);
};

export const login = (email, password) => {
  if (email === ADMIN.email && password === ADMIN.password) {
    localStorage.setItem(TOKEN_KEY, "admin-" + Date.now());
    return true;
  }
  return false;
};

export const fotoNeBase64 = (file) =>
  new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
