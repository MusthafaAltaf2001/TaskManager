"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import axios from "axios";
import { signUpSchema } from "@/schema";
import { signupApi } from "@/api/user";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type SignUpFormValues = z.infer<typeof signUpSchema>;

const SignUpPage = () => {
  const navigate = useRouter();

  // const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
  });

  /**
   * Handles user signup
   */
  const onSubmit = async (data: SignUpFormValues) => {
    try {
      await signupApi(data)

      // Handle success
      navigate.push("/login");
    } catch (error) {
      // Handle error
      if (axios.isAxiosError(error)) {
        console.error(
          "Error submitting form:",
          error.response?.data || error.message
        );
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 to-indigo-600 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Join Task Manager
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">User Name</Label>
              <Input
                id="username"
                placeholder="john"
                {...register("username")}
                className={`border ${errors.username ? "border-red-500" : ""}`}
              />
              {errors.username && (
                <p className="text-xs text-red-400">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="john@example.com"
                {...register("email")}
                className={`border ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && (
                <p className="text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Create a strong password"
                {...register("password")}
                className={`border ${errors.password ? "border-red-500" : ""}`}
              />
              {errors.password && (
                <p className="text-xs text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* {!session && (
            <div className="grid grid-cols-2 gap-4 mt-6">
              <Button
                onClick={() => signIn("google")}
                variant="outline"
                className="w-full"
              >
                <FaGoogle className="mr-2 h-4 w-4" /> Google
              </Button>
              <Button
                onClick={() => signIn("github")}
                variant="outline"
                className="w-full"
              >
                <FaGithub className="mr-2 h-4 w-4" /> GitHub
              </Button>
            </div>
          )} */}

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-primary hover:underline">
              Sign in
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
