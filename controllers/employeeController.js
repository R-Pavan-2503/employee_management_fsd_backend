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
        .json({ message: "Employee ID, Email or Phone already exists." });
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

module.exports = { addEmployee };
