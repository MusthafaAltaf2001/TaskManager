import Kanban from "@/components/pages/kanban/Kanban";
import Navbar from "@/components/pages/navbar/Navbar";
// import TaskManagerDashboard from "@/components/pages/task-manager-dashboard/TaskManagerDashboard";
// import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-indigo-300 dark:from-gray-800 dark:to-gray-900 font-[family-name:var(--font-geist-sans)] overflow-x-hidden">
      <Navbar />
      <Kanban />
    </div>
  );
}
