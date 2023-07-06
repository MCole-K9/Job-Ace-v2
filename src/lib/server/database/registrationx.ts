import { Prisma } from "@prisma/client";
import prisma from "./";
import type { email_registration_schema } from "$lib/schemas";
import type { z } from "zod";

export const register_x_prisma = prisma.$extends({
    model: {
        profile: {
            async create_profile(user_id: string, data: z.infer<typeof email_registration_schema>){

                return prisma.$transaction([
                     prisma.profile.create({
                         data: {
                             users: {
                                 connect: {
                                     id: user_id
                                 }
                             },
                             first_name: data.first_name,
                             last_name: data.last_name,
                             user_role: data.user_role,
                         }
                     }),
                     data.user_role === "CANDIDATE" 
                     ? Prisma.getExtensionContext(this).connectCandidate(user_id)
                     : Prisma.getExtensionContext(this).connectOrganizationRepresentative(user_id)
                 ])
                
            },
            connectCandidate(user_id: string){
                return prisma.candidate.create({
                    data: {
                        User: {
                            connect: {
                                id: user_id
                            }
                        }
                    }
                })  
            },

            connectOrganizationRepresentative(user_id: string){
                return prisma.organizationRepresentative.create({
                    data: {
                        users: {
                            connect: {
                                id: user_id
                            }
                        }
                    }
                })  
            }

        }
    }
});
