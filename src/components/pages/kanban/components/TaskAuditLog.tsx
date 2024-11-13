import { CheckCircle2, Circle, Clock, RefreshCcw } from 'lucide-react'
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
                {/* <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" /> */}
                {/* <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                        {formatDate(entry.timestamp)}
                    </time> */}
                {/* <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
                        {getEventIcon(entry.event)}
                        <span className="capitalize">{entry.event}</span>
                    </h3> */}
                {/* {entry.event === 'updated' && index > 0 && (
                        <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                            Task was updated
                        </p>
                    )} */}
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
                        {/* <CheckCircle2 className="h-4 w-4 text-purple-500" /> */}
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

const getEventIcon = (event: string) => {
    switch (event) {
        case 'created':
            return
        case 'updated':
            return <RefreshCcw className="h-4 w-4 text-blue-500" />
        default:
            return <Clock className="h-4 w-4 text-gray-500" />
    }
}

export default TaskAuditLog