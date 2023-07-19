import prisma from '$lib/server/database';
import {redirect, error} from '@sveltejs/kit';

export const load = async ({request, locals}) => {
    
    const session = await locals.getSession();
    console.log(session);

    if (!session){
        redirect(301, '/login')
    }

    const isAdmin = await prisma.profile.findUnique({
        where: {
            user_id: session?.user.id
        }
    })

    if (!isAdmin){
        throw error(403, "you do not have permission to visit this page");
    }

    return {session};
}