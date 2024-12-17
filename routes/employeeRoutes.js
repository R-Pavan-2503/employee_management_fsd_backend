const express = require("express");
const { addEmployee } = require("../controllers/employeeController");
const router = express.Router();

router.post("/add", addEmployee);

module.exports = router;
