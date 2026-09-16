const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { mbroje } = require("../middleware/auth");
const {
  merrProna,
  merrNjeProne,
  krijoProne,
  perditesoProne,
  fshijProne,
} = require("../controllers/propertyController");

router.get("/", merrProna);
router.get("/:id", merrNjeProne);
router.post("/", mbroje, upload.array("fotot", 10), krijoProne);
router.put("/:id", mbroje, upload.array("fotot", 10), perditesoProne);
router.delete("/:id", mbroje, fshijProne);

module.exports = router;
