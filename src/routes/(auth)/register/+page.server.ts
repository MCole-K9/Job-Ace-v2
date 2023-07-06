import { email_registration_schema } from '$lib/schemas';
import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { register_x_prisma } from '$lib/server/database';

export const load = (async () => {
    return {
        form: await superValidate(email_registration_schema)

    };
}) satisfies PageServerLoad;


export const actions: Actions = {
    default: async ({request, locals}) => {

        const form = await superValidate(request, email_registration_schema);

        if(!form.valid){
            return fail(400, {form})
        }

        const auth_res = await locals.supabase.auth.signUp({
            email: form.data.email,
            password: form.data.password
        })

        if(auth_res.error){
            return fail(400, {form, error: auth_res.error})
        }else{
            register_x_prisma.profile.create_profile(auth_res.data.user?.id as string, form.data)
        }
    }
};