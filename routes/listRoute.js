const express = require("express");
const router = express.Router();
const auth = require("../auth")
const listControler=require("../controler/listControler")


router.post("/create",auth(["admin"]),listControler.createList);
router.get("/",auth(["admin"]),listControler.getLists);
router.delete("/:id",auth(["admin"]),listControler.removeList);
router.patch("/:id",auth(["admin"]),listControler.updateList)
module.exports = router;