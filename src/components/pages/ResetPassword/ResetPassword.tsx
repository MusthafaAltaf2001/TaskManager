'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from 'axios'
import { useForm } from 'react-hook-form';
import { resetPasswordSchema } from '@/lib/validationSchema';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

const ResetPassword = ({ token }: { token: string }) => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<ResetPasswordValues>({
        resolver: zodResolver(resetPasswordSchema),
    });
    const { toast } = useToast()
    const router = useRouter()

    const onSubmit = async (data: string) => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/resetPassword/${token}`,
                data,
            );
            console.log(response)
            toast({
                title: "Success",
                description: "Your password has been reset successfully",
                variant: "default",
            });
            router.push('/login')
        } catch (error) {
            console.log(error)
            // Handle error
            setError("password", {
                type: "manual",
                message: error?.response?.data.message || error.message
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
                            <Label htmlFor="password">Password</Label>
                            <Input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
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
                            Submit
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default ResetPassword