const express = require("express");
const { validatemessage} = require("../middleware/validate");
const { validateToken} = require("../middleware/tokens");
const {create,get,update}= require("..//controllers/message");
const router = express.Router();


router.post("/create",validateToken,validatemessage,create)
router.put("/update",validateToken,update)
router.get("/",validateToken,get)

module.exports = router;