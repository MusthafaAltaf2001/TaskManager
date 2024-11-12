import { TaskFormValues } from "./task";
import { taskSchema } from "./task";

import { signUpSchema } from "./user";
import { loginSchema } from "./user";
import { forgotPasswordSchema } from "./user";
import { resetPasswordSchema } from "./user";

export {
    taskSchema,
    signUpSchema,
    loginSchema,
    forgotPasswordSchema,
    resetPasswordSchema
}

export type {
    TaskFormValues
}