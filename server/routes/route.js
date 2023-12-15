// URL PATH

const express = require("express");

const {
    check,
    register,
    login
} = require("../controllers/user"); // IMPORTING CONTROLLER

const router = express.Router();

router.get("/" , check);
router.post("/register", register);
router.post("/login", login);


module.exports = router;