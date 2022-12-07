const express = require("express");
const { validateCreate} = require("../middleware/validate");
const {login,signup}= require("..//controllers/auth");
const router = express.Router();


router.post("/login",login);

router.post("/signup", validateCreate, signup);

module.exports = router;