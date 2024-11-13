import { CheckCircle2, Circle, RefreshCcw } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { FileClock } from "lucide-react"
import { Task } from "@/types"
import { formatDate } from '@/utils';

const TaskAuditLog = ({ task }: { task: Task }) => {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    className="text-gray-400 hover:text-yellow-500 transition-colors duration-200 p-1 rounded-full hover:bg-yellow-50"
                >
                    <FileClock size={18} />
                </button>
            </DialogTrigger>
            <DialogContent className="w-80">
                <DialogHeader>
                    <DialogTitle className="text-indigo-600">
                        {task.title} Audit Log
                    </DialogTitle>
                </DialogHeader>
                <ol className="relative border-l border-gray-200 dark:border-gray-700">
                    <li className="mb-10 ml-4 flex-row flex gap-2 items-center">
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />
                        <Circle className="h-4 w-4 text-green-500" />
                        <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                            Task created at {formatDate(task.createdAt)}
                        </p>
                    </li>

                    <li className="mb-10 ml-4 flex-row flex gap-2 items-center">
                        <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />
                        <RefreshCcw className="h-4 w-4 text-blue-500" />
                        <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                            Task updated at {formatDate(task.updatedAt)}
                        </p>
                    </li>
                    {task.completedAt && (
                        <li className="mb-10 ml-4 flex-row flex gap-2 items-center">
                            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />
                            <CheckCircle2 className="h-4 w-4 text-purple-500" />
                            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                                Task completed at {formatDate(task.completedAt)}
                            </p>
                        </li>
                    )}
                </ol>
            </DialogContent>
        </Dialog >
    )
}

export default TaskAuditLog