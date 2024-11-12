import { forgotPasswordSchema, loginSchema, signUpSchema } from "@/schema";

import { z } from "zod";

export type LoginFormValues = z.infer<typeof loginSchema>;

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export type SignUpFormValues = z.infer<typeof signUpSchema>;
