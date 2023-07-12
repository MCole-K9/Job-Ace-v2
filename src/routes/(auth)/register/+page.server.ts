import { email_registration_schema } from '$lib/schemas';
import { fail, type Actions, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms/server';

export const load = (async () => {
    return {
        form: superValidate(email_registration_schema)

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
            password: form.data.password, 
            options: {
                data: {
                    first_name: form.data.first_name,
                    last_name: form.data.last_name,
                    user_role: form.data.user_role
                },
                emailRedirectTo: "http://127.0.0.1:5173/post-verification"
            }
        })
      
        console.log(auth_res);
        

        if(auth_res.error){
            // return fail(400, {form, error: auth_res.error})
            return message(form, auth_res.error.message, {
                status: 403
            })
        }
       
        if(!auth_res.data.session){
            return message(form,  "An Email has been sent to your email address. Please verify your email address to continue.")
        }


        //register_x_prisma.profile.create_profile(auth_res.data.user?.id as string, form.data)
           
        
    }
};