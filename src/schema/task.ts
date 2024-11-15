import * as z from "zod";

// Define the task validation schema using Zod
export const taskSchema = z.object({
    title: z
        .string()
        .min(1, { message: "* Task title is required" })
        .max(100, { message: "* Title should not exceed 100 characters" }),
    description: z.string().optional(),
    status: z.enum(["To Do", "In Progress", "Completed"], {
        required_error: "* Status is required",
    }),
    priority: z.enum(["Low", "Medium", "High"], {
        required_error: "* Priority is required",
    }),
    dueDate: z.coerce.date().optional().nullable(),
});


