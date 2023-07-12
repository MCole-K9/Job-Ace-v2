import {json, error} from '@sveltejs/kit';
import {Role} from '@prisma/client';
import { adminOrSupportOrUser, candidateOrCoach, organizationRepresntative } from '$lib/server/addUser.js';
import {PrismaClient} from '@prisma/client';

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
            
            
            switch (userType){
                case Role.ADMIN:
                    const adminValidator = adminOrSupportOrUser.safeParse(userData);

                    console.log(userData);
                    if (adminValidator.success){

                        const prisma = new PrismaClient();
                        const newUser = await prisma.users.create({
                            data: {
                                id: '', // schema doesn't autogen uuids, so this is currently
                                // stopping me
                                email: adminValidator.data.email,
                                encrypted_password: adminValidator.data.password,
                                Profile: {
                                    create: {
                                        user_role: Role.ADMIN
                                    }
                                }
                            },
                            include: {
                                Profile: true
                            }
                        })

                        console.log(newUser);

                        if (!newUser){
                            return json({},  {status: 500,
                            statusText: "Unable to create Account"});

                        }
                        else {
                            return json({}, {status: 201,
                                statusText: "Administrator account successfully created"});
                        }
                    }
                    else {
                        return json({result: adminValidator.error}, {status: 500, 
                            statusText: "Unable to create account"});
                    }
                case Role.SUPPORT:
                    const supportValidator = adminOrSupportOrUser;
                    supportValidator.parse(userData);

                    if (supportValidator){
                        return json({}, {status: 201,
                            statusText: "Support Staff account successfully created"});
                    }
                    else {
                        // return the relevant errors
                    }    
                case Role.ORGANIZATION_REPRESENTATIVE:
                    
                    return json({}, {status: 201,
                        statusText: "Organization Representative account successfully created"});
                case Role.CAREER_COACH:

                    return json({}, {status: 201,
                        statusText: "Career Coach successfully created"});
                case Role.CANDIDATE:

                    return json({}, {status: 201, 
                    statusText: "Candidate Account Successfully created"});
                case Role.USER:
                    
                    return json({}, {status: 201, 
                        statusText: "Generic User account successfully created"});
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