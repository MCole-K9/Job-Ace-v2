import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { email_login_schema } from '$lib/schemas';
import { fail, redirect } from '@sveltejs/kit';

export const load = (async () => {
    return {
        form: superValidate(email_login_schema)
    };
}) satisfies PageServerLoad;


export const actions: Actions = {
    default: async ({request, locals}) => {
        const form = await superValidate(request, email_login_schema);


        if(!form.valid){
            return fail(400, {form})
        }

        const auth_res = await locals.supabase.auth.signInWithPassword({
            email: form.data.email,
            password: form.data.password
        })

        if(auth_res.error){
            return message(form, auth_res.error.message, {
                status: 400
            })
        }

        throw redirect(301, "/dashboard");

        
    }
};