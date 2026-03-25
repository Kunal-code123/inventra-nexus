const express = require("express");
const router = express.Router();

// TEST ROUTE (temporary)
router.get("/", (req, res) => {
  res.json({ message: "Products route working ✅" });
});

module.exports = router;