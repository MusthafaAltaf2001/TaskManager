'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { ForgotPasswordValues } from "@/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from 'react'
import axios from 'axios'
import { forgotPasswordApi } from "@/api";
import { forgotPasswordSchema } from "@/schema";
import { useForm } from 'react-hook-form';
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";

const ForgotPassword = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<ForgotPasswordValues>({
        resolver: zodResolver(forgotPasswordSchema),
    });
    const { toast } = useToast()

    const onSubmit = async (data: string) => {
        try {
            await forgotPasswordApi(data)
            toast({
                title: "Success",
                description: "A password reset link has been sent to your email",
                variant: "default",
            });
        } catch (error: any) {
            console.log(error)
            // Handle error
            setError("email", {
                type: "manual",
                message: error?.response?.data.message || error?.message
            })
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
        <div className='min-h-screen bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center p-4'>
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center">
                        Forgot Password
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                {...register("email")}
                                className={`border ${errors.email ? "border-red-500" : ""}`}
                            />
                            {errors.email && (
                                <p className="text-xs text-red-400">{errors.email.message}</p>
                            )}
                        </div>
                        <Button type="submit" className="w-full">
                            Submit
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default ForgotPassword