const express = require("express");
const router = express.Router();
const auth = require("../auth")
const listControler=require("../controler/listControler")


router.post("/create",auth(["admin"]),listControler.createList);
router.get("/",listControler.getLists);
router.delete("/:id",listControler.removeList);
router.patch("/:id",listControler.updateList)
module.exports = router;