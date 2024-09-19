import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.routes";
import todoRoutes from "./routes/todo.routes";
// Initialize the Express app
const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use("/users", userRoutes); // User-related routes
app.use("/todos", todoRoutes); // Todo-related routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app; // Export the app for testing or further configuration
