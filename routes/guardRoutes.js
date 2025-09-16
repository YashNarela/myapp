const router = require("express").Router();
const auth = require("../middleware/auth");
const { createGuard, getGuards, updateGuard, deleteGuard } = require("../controllers/guardController");
router.post("/", auth(["employee"]), createGuard);
router.get("/", auth(["admin","employee"]), getGuards);
router.put("/:id", auth(["employee"]), updateGuard);
router.delete("/:id", auth(["employee"]), deleteGuard);
module.exports = router;
