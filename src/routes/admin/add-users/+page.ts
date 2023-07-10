import {Role} from '@prisma/client';

export function load () {
    let user_roles: string[] = [];

    // This is probably nasty but tbh, i know it works and i don't feel like  
    // finding how to turn an object into an array
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


    
    return {roles: roles_data};

}

