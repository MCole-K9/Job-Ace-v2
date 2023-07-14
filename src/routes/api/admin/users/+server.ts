import {json, error} from '@sveltejs/kit';
import {Role} from '@prisma/client';
import { adminOrSupportOrUser, candidateOrCoach, organizationRepresntative } from '$lib/server/addUser.js';
import {PrismaClient} from '@prisma/client';
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';

export async function GET (){
    // this will probably get all users, i suppose

}

export async function POST({request, locals:{getSession, supabase}}){

    let session = await getSession();
    let result = await request.json();

    let userType: string = result.chosenRole;
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
            
            switch (userType){
                case Role.ADMIN:
                    const adminValidator = adminOrSupportOrUser.safeParse(userData);

                    if (adminValidator.success){

                        const { data, error } = await adminClient.createUser({
                            email: adminValidator.data.email,
                            password: adminValidator.data.password,
                            email_confirm: true
                        })

                        let adminProfile;

                        if (data.user){
                            const prisma = new PrismaClient();
                            adminProfile = await prisma.profile.create({
                                data: {
                                    user_role: Role.ADMIN,
                                    users: {
                                        connect: {
                                            id: data.user.id
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
                            return json({ userData: data, profileData: adminProfile}, {status: 201,
                                statusText: "Administrator account successfully created"});
                        }
                    }
                    else {
                        return json({result: adminValidator.error}, {status: 500, 
                            statusText: "Unable to create account"});
                    }
            
                case Role.SUPPORT:
                    const supportValidator = adminOrSupportOrUser.safeParse(userData);

                    if (supportValidator.success){
                       
                        const { data, error } = await adminClient.createUser({
                            email: supportValidator.data.email,
                            password: supportValidator.data.password,
                            email_confirm: true
                        })

                        let supportProfile;

                        if (data.user){
                            const prisma = new PrismaClient();
                            supportProfile = await prisma.profile.create({
                                data: {
                                    user_role: Role.SUPPORT,
                                    users: {
                                        connect: {
                                            id: data.user.id
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
                            return json({ userData: data, profileData: supportProfile}, {status: 201,
                                statusText: "Support Staff account successfully created"});
                        }
                    }
                    else {
                        return json({result: supportValidator.error}, {status: 500, 
                            statusText: "Unable to create account"});
                    }
                
                case Role.ORGANIZATION_REPRESENTATIVE:
                    
                    return json({}, {status: 201,
                        statusText: "Organization Representative account successfully created"});
                
                case Role.CAREER_COACH:

                    const coachValidator = candidateOrCoach.safeParse(userData);

                    if (coachValidator.success){
                    
                        const { data, error } = await adminClient.createUser({
                            email: coachValidator.data.email,
                            password: coachValidator.data.password,
                            email_confirm: true
                        })

                        let coachProfile;

                        if (data.user){
                            const prisma = new PrismaClient();
                            coachProfile = await prisma.profile.create({
                                data: {
                                    user_role: Role.CANDIDATE,
                                    first_name: coachValidator.data.firstName,
                                    last_name: coachValidator.data.lastName,
                                    users: {
                                        connect: {
                                            id: data.user.id
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
                            return json({ userData: data, profileData: coachProfile}, {status: 201,
                                statusText: "Career Coach account successfully created"});
                        }
                    }
                    else {
                        return json({result: coachValidator.error}, {status: 500, 
                            statusText: "Unable to create account"});
                    }
                
                case Role.CANDIDATE:

                    const candidateValidator = candidateOrCoach.safeParse(userData);

                    if (candidateValidator.success){
                    
                        const { data, error } = await adminClient.createUser({
                            email: candidateValidator.data.email,
                            password: candidateValidator.data.password,
                            email_confirm: true
                        })

                        let candidateProfile;

                        if (data.user){
                            const prisma = new PrismaClient();
                            candidateProfile = await prisma.profile.create({
                                data: {
                                    user_role: Role.CANDIDATE,
                                    first_name: candidateValidator.data.firstName,
                                    last_name: candidateValidator.data.lastName,
                                    users: {
                                        connect: {
                                            id: data.user.id
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
                            return json({ userData: data, profileData: candidateProfile}, {status: 201,
                                statusText: "Candidate account successfully created"});
                        }
                    }
                    else {
                        return json({result: candidateValidator.error}, {status: 500, 
                            statusText: "Unable to create account"});
                    }
                
                case Role.USER:
                    
                    const userValidator = adminOrSupportOrUser.safeParse(userData);

                    if (userValidator.success){
                    
                        const { data, error } = await adminClient.createUser({
                            email: userValidator.data.email,
                            password: userValidator.data.password,
                            email_confirm: true
                        })

                        let userProfile;

                        if (data.user){
                            const prisma = new PrismaClient();
                            userProfile = await prisma.profile.create({
                                data: {
                                    user_role: Role.USER,
                                    users: {
                                        connect: {
                                            id: data.user.id
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
                            return json({ userData: data, profileData: userProfile}, {status: 201,
                                statusText: "User account successfully created"});
                        }
                    }
                    else {
                        return json({result: userValidator.error}, {status: 500, 
                            statusText: "Unable to create account"});
                    }
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