const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const employeeRoutes = require("./routes/employeeRoutes");
const Employee = require("./models/employeeModel");

const app = express();

// Define allowed origins for CORS
const allowedOrigins = [
  "https://employee-management-fsd-frontend.vercel.app", // Replace with your actual frontend URL
];

// Enable CORS for specific origins and handle preflight requests
app.use(
  cors({
    origin: allowedOrigins, // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
    preflightContinue: false, // Handle preflight requests automatically
    optionsSuccessStatus: 204, // Status code for successful preflight response
  })
);

app.use(express.json());
app.use("/api/employees", employeeRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    await Employee.sync({ force: false }); // Sync the Employee model with the database
    console.log("Employee table synced.");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();
