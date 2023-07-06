import { Role } from '@prisma/client';
import {z} from 'zod';

export const emailRegistrationSchema = z.object({
    first_name: z.string().min(1, {message: "First Name is Required"}).max(255),
    last_name: z.string().min(1, {message: "Last Name is Required"}).max(255),
    email: z.string().email({message: "Invalid Email"}),
    password: z.string().min(8, {message: "Password Should Be a Minimum of 8 Characters"}).max(255),
    password_confirmation: z.string().min(8, {message: "Password Should Be a Minimum of 8 Characters"}).max(255),
    user_role: z.enum([Role.ORGANIZATION_REPRESENTATIVE, Role.CANDIDATE]).optional()

}).superRefine(({password, password_confirmation}, ctx)=>{
    if(password !== password_confirmation){
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Passwords Do Not Match",
            path: ["password_confirmation"]
        })
    }
})