const Employee = require("../models/employeeModel");
const { Op } = require("sequelize");

const addEmployee = async (req, res) => {
  const { name, employeeId, email, phone, department, dateOfJoining, role } =
    req.body;

  try {
    const existingEmployee = await Employee.findOne({
      where: {
        [Op.or]: [{ employeeId }, { email }, { phone }],
      },
    });

    if (existingEmployee) {
      return res
        .status(400)
        .json({ message: "Employee ID, Email, or Phone already exists." });
    }

    const newEmployee = await Employee.create({
      name,
      employeeId,
      email,
      phone,
      department,
      dateOfJoining,
      role,
    });

    res
      .status(201)
      .json({ message: "Employee added successfully", newEmployee });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Employee.destroy({ where: { id } });
    if (deleted) {
      return res
        .status(200)
        .json({ message: "Employee deleted successfully." });
    }
    return res.status(404).json({ message: "Employee not found." });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = { addEmployee, getEmployees, deleteEmployee };
