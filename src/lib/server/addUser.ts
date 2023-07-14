import {z} from 'zod';
import { OrganizationRole } from '@prisma/client';

export const candidateOrCoach = z.object({
    firstName: z.string().trim(),
    lastName: z.string().trim(),
    email: z.string().trim().email(),
    password: z.string().min(8)

})

export const adminOrSupportOrUser = z.object({
    email: z.string().email(),
    password: z.string().min(8)
})

// this the same as candidateOrCoach and i'll probably rename it later
export const organizationRepresntative = z.object({
    email: z.string().trim().email(),
    password: z.string().min(8),
    firstName: z.string().trim(),
    lastName: z.string().trim()
})