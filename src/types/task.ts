import { UniqueIdentifier } from "@dnd-kit/core"

export interface Task {
    _id: UniqueIdentifier;
    title: string;
    description?: string;
    status: "To Do" | "In Progress" | "Completed";
    priority: "Low" | "Medium" | "High";
    dueDate?: Date;
}

export interface TaskFormValues {
    title: string;
    description?: string;
    status: "To Do" | "In Progress" | "Completed";
    priority: "Low" | "Medium" | "High";
    dueDate?: Date;
}

// export type TaskFormValues = z.infer<typeof taskSchema>;