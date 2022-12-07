const express = require("express");
const { validatemessage} = require("../middleware/validate");
const { validateToken} = require("../middleware/tokens");
const {create,get,update,getbyid}= require("..//controllers/message");
const router = express.Router();


router.post("/create",validatemessage,create)
router.put("/update",update)
router.get("/",get)
router.get("/findone/:id",getbyid)


module.exports = router;