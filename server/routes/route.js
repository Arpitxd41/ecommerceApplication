// URL PATH

const express = require("express");

const {
    home,
    createUser,
} = require("../controllers/user"); // IMPORTING CONTROLLER

const router = express.Router();

router.get("/" , home);
router.post("/register", createUser);


module.exports = router;