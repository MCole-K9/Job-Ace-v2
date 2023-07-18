import {z} from 'zod';
import { Role } from '@prisma/client';

const roleEnum = z.nativeEnum(Role);

export const minimalUserSchema = z.object({
    firstName: z.string().trim().optional(),
    lastName: z.string().trim().optional(),
    email: z.string().trim().email(),
    password: z.string().min(8),
    role: roleEnum
})