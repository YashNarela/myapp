const router = require("express").Router();
const auth = require("../middleware/auth");
const { createQR, getAllQR, deleteQR } = require("../controllers/qrController");
router.post("/", auth(["admin"]), createQR);
router.get("/", auth(["admin","employee"]), getAllQR);
router.delete("/:id", auth(["admin"]), deleteQR);
module.exports = router;
