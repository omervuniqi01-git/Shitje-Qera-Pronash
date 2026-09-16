const jwt = require("jsonwebtoken");

const mbroje = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ mesazhi: "Nuk je i autorizuar" });
  }

  try {
    const dekoduar = jwt.verify(token, process.env.JWT_SECRET);
    req.user = dekoduar;
    next();
  } catch (error) {
    return res.status(401).json({ mesazhi: "Token i pavlefshem" });
  }
};

module.exports = { mbroje };
