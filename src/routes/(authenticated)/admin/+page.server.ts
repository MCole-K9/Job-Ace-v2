import {redirect, error} from '@sveltejs/kit'
import prisma from '$lib/server/database';


export async function load ({request, locals: {getSession}}){
    
    // let session = await getSession();
    // console.log(session);

    // if (!session){
    //     throw redirect(300, '/login');
    // }

    // const isAdmin = await prisma.profile.findUnique({
    //     where: {
    //         user_id: session?.user.id
    //     }
    // })

    // if (!isAdmin){
    //     throw error(403, "you do not have permission to visit this page");
    // }

    return;
}