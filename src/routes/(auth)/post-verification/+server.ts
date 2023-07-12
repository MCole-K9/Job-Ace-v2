import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { register_x_prisma } from '$lib/server/database';

export const GET: RequestHandler = async ({locals, url}) => {

    const code = url.searchParams.get('code')

    if(code){
        const session  = await locals.supabase.auth.exchangeCodeForSession(code)

        if(await register_x_prisma.profile.create_profile(session.data.user?.id as string, session.data.user?.user_metadata as any )){
            throw redirect(301, "/login")
        }

        
    }
    
    return new Response("error occurred: Soon Fix up this");
};