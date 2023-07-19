import type { Prisma } from "@prisma/client";

export type UserInfo = Prisma.ProfileGetPayload<{
    include: {
        users: {
            select: {
                email: true;
            }
        }
    }
}>



