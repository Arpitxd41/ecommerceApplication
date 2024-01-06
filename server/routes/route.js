// URL PATH

const express = require("express");

const {
    generateToken,
    register,
    login
} = require("../controllers/user"); // IMPORTING CONTROLLER

const router = express.Router();

router.get("/" , generateToken);
router.post("/register", register);
router.post("/login", login);


module.exports = router;