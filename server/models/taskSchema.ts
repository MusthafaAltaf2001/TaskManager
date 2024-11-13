import mongoose, { Document, Schema } from "mongoose";

import { User } from "./userSchema";

// Task interface
interface ITask extends Document {
  userId: string;
  title: string;
  description?: string;
  status: "To Do" | "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High";
  dueDate?: Date;
  isDeleted: boolean;
  isNotified: boolean;
}

// Task Schema Definition
const taskSchema: Schema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Completed"],
    default: "To Do",
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
  dueDate: {
    type: Date,
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  isNotified: {
    type: Boolean,
    default: false
  }
});

export const Task = mongoose.model<ITask>("Task", taskSchema);
