import { redirect, error, json } from '@sveltejs/kit';
import prisma from '$lib/server/database/index';
import { Role } from '@prisma/client'


export async function load ({fetch, request, locals: {getSession}}){
    const session = await getSession();

    if (session){

        const isAdmin = await prisma.profile.findUnique({
            where: {
                user_id: session.user.id
            }
        });

        if (isAdmin.user_role === Role.ADMIN){
            const userRequest = await fetch('/api/admin/users', {
                method: 'GET'
            });

            if (userRequest){
                const users = await userRequest.json();
                return {users};
            }
            else {
                throw error (500);
            }

        }
        else {
            throw error (403, "You do not have permission to visit this page");
        }
    }
    else {
        throw redirect(301, '/login')
    }
}