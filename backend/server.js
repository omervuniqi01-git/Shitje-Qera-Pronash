require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const propertyRoutes = require("./routes/propertyRoutes");
const authRoutes = require("./routes/authRoutes");

connectDB();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/properties", propertyRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ mesazhi: "API e pronave po funksionon" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ mesazhi: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveri po degjon ne portin ${PORT}`);
});
