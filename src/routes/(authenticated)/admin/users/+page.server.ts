import { redirect, error, json } from '@sveltejs/kit';
import prisma from '$lib/server/database/index';
import { Role } from '@prisma/client';
import { queryParameters } from 'sveltekit-search-params';


export async function load ({url ,fetch, request, locals: {getSession}}){
    const session = await getSession();

    if (session){

        const isAdmin = await prisma.profile.findUnique({
            where: {
                user_id: session.user.id
            }
        });

        if (isAdmin.user_role === Role.ADMIN){
            
            return;
        }
        else {
            throw error (403, "You do not have permission to visit this page");
        }
    }
    else {
        throw redirect(301, '/login')
    }
}