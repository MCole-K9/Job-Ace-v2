import { Prisma } from "@prisma/client";
import prisma from "./";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { email_registration_schema } from "$lib/schemas";
import type { z } from "zod";

export const register_x_prisma =  prisma.$extends({
    model: {
        users: {
            async signUp(supabase: SupabaseClient, data: z.infer<typeof email_registration_schema>){

                const res = await supabase.auth.signUp({
                    email: data.email,
                    password: data.password
                })
                
                if(!res.error && res.data.user){
                    

                   return prisma.$transaction([

                        prisma.profile.create({
                            data: {
                                users: {
                                    connect: {
                                        id: res.data.user.id
                                    }
                                },
                                first_name: data.first_name,
                                last_name: data.last_name,
                                user_role: data.user_role,
                            }
                        }),

                        data.user_role === "CANDIDATE" 
                        ? Prisma.getExtensionContext(this).connectCandidate(res.data.user.id)
                        : Prisma.getExtensionContext(this).connectOrganizationRepresentative(res.data.user.id)

                       

                    ])
                }
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
