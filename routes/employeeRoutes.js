const router = require("express").Router();
const auth = require("../middleware/auth");
const {   createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee, } = require("../controllers/employeeController");
router.get("/", auth(["admin"]), getEmployees);
router.post("/", auth(["admin"]), createEmployee);
router.put("/:id", auth(["admin"]), updateEmployee);

router.delete("/:id", auth(["admin"]), deleteEmployee);




module.exports = router;
