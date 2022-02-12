const express = require("express");

const { authenticate } = require("../../middlewares");
const router = express.Router();

router.get("/current", authenticate, async (req, res, next) => {
  res.json({
    email: req.user.email,
    subscription: "starter",
  });
});

router.get("/logout", authenticate, async (req, res, next) => {
  try {
  } catch (error) {}
});
module.exports = router;
