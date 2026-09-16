const jwt = require("jsonwebtoken");
const User = require("../models/User");

const gjeneroToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ mesazhi: "Email ose fjalekalim i gabuar" });
    }

    res.json({
      _id: user._id,
      email: user.email,
      token: gjeneroToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ mesazhi: error.message });
  }
};

module.exports = { login };
