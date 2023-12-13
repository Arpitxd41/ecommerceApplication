// URL PATH

const express = require("express");

const {
    check,
    register,
} = require("../controllers/user"); // IMPORTING CONTROLLER

const router = express.Router();

router.get("/" , check);
router.post("/register", register);


module.exports = router;