import { loginSchema } from "@/schema";
import { z } from "zod";

export type LoginFormValues = z.infer<typeof loginSchema>;