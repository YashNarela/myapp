const router = require("express").Router();
const { register, login } = require("../controllers/authController");
// allow initial register without auth (or use seedAdmin.js)
router.post("/register", register);
router.post("/login", login);
module.exports = router;
