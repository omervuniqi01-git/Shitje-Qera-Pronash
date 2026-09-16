const path = require("path");
const fs = require("fs");
const Property = require("../models/Property");

const uploadDir = path.join(__dirname, "..", "uploads");

const merrProna = async (req, res) => {
  try {
    const { lloji, qellimi, lokacioni, cmimiMin, cmimiMax, kerko } = req.query;
    const filter = {};

    if (lloji) filter.lloji = lloji;
    if (qellimi) filter.qellimi = qellimi;
    if (lokacioni) filter.lokacioni = { $regex: lokacioni, $options: "i" };
    if (kerko) filter.titulli = { $regex: kerko, $options: "i" };

    if (cmimiMin || cmimiMax) {
      filter.cmimi = {};
      if (cmimiMin) filter.cmimi.$gte = Number(cmimiMin);
      if (cmimiMax) filter.cmimi.$lte = Number(cmimiMax);
    }

    const prona = await Property.find(filter).sort({ createdAt: -1 });
    res.json(prona);
  } catch (error) {
    res.status(500).json({ mesazhi: error.message });
  }
};

const merrNjeProne = async (req, res) => {
  try {
    const prona = await Property.findById(req.params.id);
    if (!prona) {
      return res.status(404).json({ mesazhi: "Prona nuk u gjet" });
    }
    res.json(prona);
  } catch (error) {
    res.status(500).json({ mesazhi: error.message });
  }
};

const krijoProne = async (req, res) => {
  try {
    const fotot = (req.files || []).map((f) => `/uploads/${f.filename}`);
    const prona = await Property.create({ ...req.body, fotot });
    res.status(201).json(prona);
  } catch (error) {
    res.status(400).json({ mesazhi: error.message });
  }
};

const perditesoProne = async (req, res) => {
  try {
    const prona = await Property.findById(req.params.id);
    if (!prona) {
      return res.status(404).json({ mesazhi: "Prona nuk u gjet" });
    }

    const fotoTeReja = (req.files || []).map((f) => `/uploads/${f.filename}`);
    let fotoEkzistuese = prona.fotot;

    if (req.body.fototEkzistuese !== undefined) {
      fotoEkzistuese = Array.isArray(req.body.fototEkzistuese)
        ? req.body.fototEkzistuese
        : [req.body.fototEkzistuese];
    }

    const teDhena = { ...req.body };
    delete teDhena.fototEkzistuese;
    teDhena.fotot = [...fotoEkzistuese, ...fotoTeReja];

    const perditesuar = await Property.findByIdAndUpdate(req.params.id, teDhena, {
      new: true,
      runValidators: true,
    });

    res.json(perditesuar);
  } catch (error) {
    res.status(400).json({ mesazhi: error.message });
  }
};

const fshijProne = async (req, res) => {
  try {
    const prona = await Property.findById(req.params.id);
    if (!prona) {
      return res.status(404).json({ mesazhi: "Prona nuk u gjet" });
    }

    prona.fotot.forEach((foto) => {
      const emri = path.basename(foto);
      const rruga = path.join(uploadDir, emri);
      if (fs.existsSync(rruga)) {
        fs.unlinkSync(rruga);
      }
    });

    await prona.deleteOne();
    res.json({ mesazhi: "Prona u fshi" });
  } catch (error) {
    res.status(500).json({ mesazhi: error.message });
  }
};

module.exports = {
  merrProna,
  merrNjeProne,
  krijoProne,
  perditesoProne,
  fshijProne,
};
