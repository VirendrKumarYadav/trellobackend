const express = require("express");
const userControle = require("../controler/userController")
const router = express.Router();
const auth = require("../auth")



router.post("/signup", userControle.userRgistration);

router.post("/login", userControle.userLogin);

router.get("/logout", auth(["admin"]), userControle.userLogout);

// router.post("/reset-password",userController.resetPassword)

// router.post("/forget-password",userController.forgetPassword)

router.get("/", auth(["admin"]), userControle.getUserID)


// router.post("/address",authMiddleawire(["admin"]),userController.saveAddress);

module.exports = router;