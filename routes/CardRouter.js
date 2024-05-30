const express = require("express");
const router = express.Router();
const auth = require("../auth")
const cardControler=require("../controler/CardControler")


router.post("/create",auth(["admin"]),cardControler.createCard);
router.get("/",auth(["admin"]),cardControler.getCards);
router.get("/:id",auth(["admin"]),cardControler.getCardById);
router.delete("/:id",auth(["admin"]),cardControler.removeCard);
router.patch("/:id",auth(["admin"]),cardControler.updateCard)

module.exports = router;