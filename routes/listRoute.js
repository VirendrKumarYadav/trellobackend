const express = require("express");
const router = express.Router();
const auth = require("../auth")
const listControler=require("../controler/listControler")

router.post("/create",listControler.createList);



module.exports = router;