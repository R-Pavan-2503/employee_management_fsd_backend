const express = require("express");
const cors = require("cors"); 
const { connectDB } = require("./config/db");
const employeeRoutes = require("./routes/employeeRoutes");
const Employee = require("./models/employeeModel");

const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/employees", employeeRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    await Employee.sync({ force: false });  
    console.log("Employee table synced.");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();
