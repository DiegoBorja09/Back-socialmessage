const express = require("express");
const authRouter = require("./auth");
const messageRouter = require("./message");
const router = express.Router();

router.use("/auth", authRouter);
router.use("/message", messageRouter);

module.exports = router;
