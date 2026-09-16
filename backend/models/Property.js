const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    titulli: {
      type: String,
      required: true,
      trim: true,
    },
    pershkrimi: {
      type: String,
      required: true,
    },
    cmimi: {
      type: Number,
      required: true,
    },
    lloji: {
      type: String,
      required: true,
      enum: ["shtepi", "banese", "toke"],
    },
    qellimi: {
      type: String,
      required: true,
      enum: ["shitje", "qera"],
    },
    lokacioni: {
      type: String,
      required: true,
      trim: true,
    },
    siperfaqja: {
      type: Number,
      default: 0,
    },
    dhoma: {
      type: Number,
      default: 0,
    },
    banjo: {
      type: Number,
      default: 0,
    },
    telefoni: {
      type: String,
      default: "",
    },
    whatsapp: {
      type: String,
      default: "",
    },
    latitude: {
      type: Number,
      default: null,
    },
    longitude: {
      type: Number,
      default: null,
    },
    fotot: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
