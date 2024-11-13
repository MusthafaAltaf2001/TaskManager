"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import { getTasksApi } from "@/api";
import { getUserProfileApi } from "@/api";
import { setTasks } from "@/app/store/slices/taskSlice";
import { setUser } from "@/app/store/slices/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

/**
 * Used to wrap the root file layout.tsx
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const { toast } = useToast()

  const fetchUserProfile = async () => {
    try {
      const { user } = await getUserProfileApi()
      const tasks = await getTasksApi()
      dispatch(setUser(user))
      dispatch(setTasks(tasks))
    } catch (error) {
      console.log(error)
      toast({
        title: "Error",
        description: "An unexpected error occured. Couldn't retrieve data",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [dispatch]);

  return (
    <SessionProvider>
      {children}
      <Toaster />
    </SessionProvider>
  );
}
