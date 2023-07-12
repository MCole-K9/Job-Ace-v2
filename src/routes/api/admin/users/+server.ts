import {json, error} from '@sveltejs/kit';
import {Role} from '@prisma/client';

export async function GET (){
    // this will probably get all users, i suppose

}

export async function POST({request, locals:{getSession}}){

    let session = await getSession();
    let user_type: string = "";

    if (session){
        // then, check to see that they are an admin (does supabase have 
        // transactions? need to look into it)
        let isAdmin: boolean = ((userId: string) => { 
            return true
        })(session.user.id);

        if (isAdmin){
            let data = await request.json();
            user_type = data.userType;
            
            switch (user_type){
                case Role.ADMIN:
                    // need to validate information first
                    
                    return json({}, {status: 201,
                        statusText: "Administrator account successfully created"});
                case Role.SUPPORT:
                    
                    return json({}, {status: 201,
                        statusText: "Support Staff account successfully created"});
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