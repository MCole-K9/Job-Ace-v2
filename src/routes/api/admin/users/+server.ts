import {json, error} from '@sveltejs/kit';
import {Role} from '@prisma/client';
import { minimalUserSchema } from '$lib/schemas/admin-userSchemas.js';
import prisma from '$lib/server/database/index.js'
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';

// Returns all users
export async function GET ({locals: { getSession }}){
    const session = await getSession();

    if (session){
        const isAdmin = await prisma.profile.findUnique({
            where: {
                user_id: session.user.id
            }
        })

        if (isAdmin?.user_role === Role.ADMIN){
            // now we can do stuff
            // this should probably be paged (look into that)
        }
        else {
            throw error(403, "Forbidden");
        }
    }
    else {
        throw error (401, "Authentication Required");
    }

}

// creates a single user
export async function POST({request, locals:{ getSession }}){

    let session = await getSession();
    let result = await request.json();

    const userData = result.userData;

    // check to see if logged in
    if (session){
        let isAdmin = await prisma.profile.findUnique({
            where: {
                user_id: session.user.id
            }
        });

        if (isAdmin?.user_role === Role.ADMIN){

            const supabaseClient = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, 
                {
                    auth: {
                    autoRefreshToken: false,
                    persistSession: false
                    }
                });
            const adminClient = supabaseClient.auth.admin;
            
            const minimalUser = minimalUserSchema.safeParse(userData);

            if (minimalUser.success){

                const { data: userData, error } = await adminClient.createUser({
                    email: minimalUser.data.email,
                    password: minimalUser.data.password,
                    email_confirm: true
                })

                let profileData;

                if (userData.user){
                    profileData = await prisma.profile.create({
                        data: {
                            user_role: minimalUser.data.role,
                            first_name: minimalUser.data.firstName,
                            last_name: minimalUser.data.lastName,
                            users: {
                                connect: {
                                    id: userData.user.id
                                }
                            }
                        }
                    })
                }

                if (error){
                    return json(error,  {status: 500,
                    statusText: "Unable to create Account"});

                }
                else {
                    return json({ ...userData.user, ...profileData}, {status: 201,
                        statusText: `${minimalUser.data.role} account successfully created`});
                }
            }
            else {
                // technically this vaidates on the frontend, which means i don't 
                // need to return the schema and its errors, but i'm keeping this
                return json({result: minimalUser.error}, {status: 500, 
                    statusText: "Unable to create account"});
            }
        }
        else {
            throw error(403, "User is not authorized to perform action");
        }

    }
    else {
        throw error(401, "Login Required");
    }
    
}

// Deletes a single user
export async function DELETE({request, locals: {getSession}}){
    return json('lol');
}