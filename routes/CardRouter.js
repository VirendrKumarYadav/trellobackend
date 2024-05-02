const express = require("express");
const router = express.Router();
const auth = require("../auth")
const cardControler=require("../controler/CardControler")


router.post("/create",auth(["admin"]),cardControler.createList);
router.get("/",auth(["admin"]),cardControler.getLists);
router.get("/:id",auth(["admin"]),cardControler.getListByd);
router.delete("/:id",auth(["admin"]),cardControler.removeList);
router.patch("/:id",auth(["admin"]),cardControler.updateList)

module.exports = router;