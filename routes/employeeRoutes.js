const express = require("express");
const {
  addEmployee,
  getEmployees,
  deleteEmployee,
} = require("../controllers/employeeController");
const router = express.Router();

router.post("/add", addEmployee);
router.get("/list", getEmployees);
router.delete("/delete/:id", deleteEmployee);

module.exports = router;
