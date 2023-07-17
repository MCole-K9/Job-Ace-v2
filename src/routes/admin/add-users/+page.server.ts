import {Role} from '@prisma/client';
import {fail, redirect} from '@sveltejs/kit';
import {superValidate} from 'sveltekit-superforms/server'
import { minimalUserValidator } from '$lib/server/addUser.js';

export async function load (event) {
    let user_roles: string[] = [];

    // i'll implement this when login is working
    // let session = await getSession();
    // if (!session){
        
    //     throw redirect(307, "login required");
    // }

    const form = await superValidate(event, minimalUserValidator);


    (() => {
        Object.values(Role).forEach((value) => {
            user_roles.push(value);
        });
    })();
    
    // since <Select> uses a two-property obj. array, i'm just going to use the 
    // previous values for name and such
    let roles_data: {name: string, value: string}[] = [];
    
    user_roles.forEach((role) => {
        roles_data.push({name: role, value: role});
    });

    return {roles: roles_data, form};

}

export const actions = {
    default: async (event) => {
        const form = await superValidate(event, minimalUserValidator);

        console.log(form);

        async function Test() {
            const response = await fetch('/api/admin/users', {
                method: 'POST',
                body: JSON.stringify({
                    userData: {
                        email: form.data.email,
                        firstName: form.data.firstName,
                        lastName: form.data.lastName,
                        password: form.data.password,
                        role: form.data.role
                    }
                }),
                headers: {
                    'Content-Type': 'application/json'
                }});
    
            // only error that matters here is a ZodError, need to look into superforms now
        }

        if (form.valid){
            return { form };
        }   
        else {
            return fail(400, { form });
        }
    }
}

