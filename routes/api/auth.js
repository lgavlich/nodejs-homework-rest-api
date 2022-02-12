const express = require("express");

const router = express.Router();

router.post("/register", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

module.exports = router;
