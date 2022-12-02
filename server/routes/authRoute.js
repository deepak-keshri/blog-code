const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { login, signin } = require("../controller/AuthCotroller");

router.post("/login", login);
router.post("/signin", signin);
// router.post("/signin", signin);
module.exports = router;