const router = require("express").Router();
const auth = require("../middleware/auth");
const { scanQR } = require("../controllers/patrolController");
router.post("/scan", auth(["employee","admin"]), scanQR);
module.exports = router;
