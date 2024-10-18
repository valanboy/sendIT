const express = require("express");
const router = express.Router();
const authcontroller = require("../controller/authController");


router.get("/", authcontroller.home_GET);

router.get("/whatsapp", authcontroller.whatsapp_GET);

router.get("/signin", authcontroller.signin_GET);

router.get("/signup", authcontroller.signup_GET);

router.post("/signup", authcontroller.signup_POST);

router.post("/sign", authcontroller.signin_POST);

router.get("/dashboard", authcontroller.dashboard);


module.exports = router;