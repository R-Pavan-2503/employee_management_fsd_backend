const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const employeeRoutes = require("./routes/employeeRoutes");
const Employee = require("./models/employeeModel");

const app = express();

// Define allowed origins for CORS
const allowedOrigins = [
  "https://your-frontend-vercel-domain.vercel.app", // Replace with your actual frontend URL
];

// Enable CORS for specific origins
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"], // Optional: Define allowed methods
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
