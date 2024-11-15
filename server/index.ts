import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import cron from "node-cron";
import dbConnect from "./lib/dbConnect";
import express from "express";
import { getTasksDueIn24Hours } from "./controllers/taskController";
import taskRoutes from "./routes/taskRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true })); // Enable CORS for all routes
app.use(cookieParser())

// Use User and Task routes
app.use("/api/users", userRoutes); // All user-related routes will be at "/api/users"
app.use("/api/tasks", taskRoutes); // All task-related routes will be at "/api/tasks"

cron.schedule("*/1 * * * *", () => {
  getTasksDueIn24Hours()
})

// Connect to MongoDB
dbConnect();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
