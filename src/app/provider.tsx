"use client";

import { API_URLS } from "@/constants";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import axios from "axios";
import { setTasks } from "@/app/store/slices/taskSlice";
import { setUser } from "@/app/store/slices/userSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function Providers({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${API_URLS.PROFILE}`,
        {
          withCredentials: true,
        }
      )
      console.log(response.data.user)
      dispatch(setUser(response.data.user))
      dispatch(setTasks(response.data.tasks))
    } catch (error) {
      console.log(error)
      console.log(error.response?.status)

      // Token expired or invalid. User will be redirected to login page
      if (error.response?.status === 401) {
        // router.push("/login")
      }
    }
  };

  useEffect(() => {
    fetchUserProfile();
    // }
  }, [dispatch]);

  return (
    <SessionProvider>
      {children}
      <Toaster />
    </SessionProvider>
  );
}
