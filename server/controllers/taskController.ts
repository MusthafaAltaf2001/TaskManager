import { EmailParams, Recipient, Sender } from "mailersend";
import { Request, Response } from "express";

import { Task } from "../models/taskSchema";
import { User } from "../models/userSchema";
import { ZodError } from "zod";
import { getTaskDueSoonEmail } from "../lib/emailTemplate";
import { mailerSend } from "../lib/mailersendConfig";
import { taskSchema } from "../lib/taskType";

// Create a new task
export const createTask = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const validatedTask = taskSchema.parse(req.body);

    //@ts-ignore
    const userId = req.user?.userId;

    // Create task
    const newTask = new Task({
      ...validatedTask,
      userId: userId
    });

    const task = await newTask.save();
    res.status(201).json(task);
  } catch (error) {
    if (error instanceof ZodError) {
      res
        .status(400)
        .json({ message: "Validation error", errors: error.errors });
    } else if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};

// Update task
export const updateTask = async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const validatedTask = taskSchema.parse(req.body);
    const { taskId } = req.params;

    //@ts-ignore
    const userId = req.user?.userId;

    // Update the task
    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId },
      validatedTask,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    if (error instanceof ZodError) {
      res
        .status(400)
        .json({ message: "Validation error", errors: error.errors });
    } else if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
};

// Delete a task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;

    // Update the task
    const deletedTask = await Task.findOneAndUpdate(
      { _id: taskId },
      {
        isDeleted: true
      },
      { new: true }
    );

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res
      .status(200)
      .json({
        task: deletedTask,
        message: "Task deleted successfully"
      });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};

// Get all tasks for a user
export const getUserTasks = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const userId = req.user?.userId;

    const tasks = await Task.find({
      userId: userId,
      isDeleted: false
    })
    if (!tasks) {
      return res.status(404).json({ message: "User not found" });
    }


    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

// Get a single task for a user
export const getSingleTask = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    //@ts-ignore
    const userId = req.user?.userId;

    const task = await Task.findOne({ _id: taskId }); // Ensure the task belongs to the user
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error fetching task", error });
  }
};

export const getTasksDueIn24Hours = async () => {
  const now = new Date();
  const next24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  // Find tasks due within the next 24 hours
  const tasksDueSoon = await Task.find({
    dueDate: { $lte: next24Hours, $gte: now },
    isNotified: false
  });

  if (tasksDueSoon.length > 0) {
    tasksDueSoon.forEach(async (task) => {

      try {
        // Get user from database
        const user = await User.findById(task.userId);

        if (!user) {
          throw new Error("User not found");
        }

        // Send email to notify the user about the task due soon
        const sentFrom = new Sender("MS_obeuxU@trial-jpzkmgqrq9v4059v.mlsender.net", user?.username);
        const recipients = [
          new Recipient(user.email, user?.username)
        ];
        const emailParams = new EmailParams()
          .setFrom(sentFrom)
          .setTo(recipients)
          .setReplyTo(sentFrom)
          .setSubject(`Task due soon: ${task.title}`)
          .setHtml(getTaskDueSoonEmail())

        await mailerSend.email.send(emailParams);
      } catch (error) {
        throw error
      }

    });

    // Set isNotified to true for the tasks that were notified
    tasksDueSoon.forEach(async (task) => {
      await Task.findOneAndUpdate({ _id: task._id }, { isNotified: true });
    });
  }
}
