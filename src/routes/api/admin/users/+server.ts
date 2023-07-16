import {json, error} from '@sveltejs/kit';
import {Role} from '@prisma/client';
import { minimalUserValidator } from '$lib/server/addUser.js';
import { prisma } from '$lib/server/database.js';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';

export async function GET (){
    // this will probably get all users, i suppose

}

export async function POST({request, locals:{getSession}}){

    let session = await getSession();
    let result = await request.json();

    const userData = result.userData;

    // check to see if logged in
    if (true){
        /* let isAdmin: boolean = ((userId: string) => { 
            return true
        })(session.user.id); */

        // then, check to see if they're an admin
        if (true){

            const supabaseClient = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, 
                {
                    auth: {
                    autoRefreshToken: false,
                    persistSession: false
                    }
                });
            const adminClient = supabaseClient.auth.admin;
            
            const minimalUser = minimalUserValidator.safeParse(userData);

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

export async function DELETE(){
    // gee, i wonder what this does
}