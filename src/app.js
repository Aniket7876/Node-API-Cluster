const express = require("express");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Middleware to parse incoming JSON
app.use(express.json());

// Task route
app.use("/api/v1", taskRoutes);

module.exports = app;
