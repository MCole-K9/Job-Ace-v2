import {Role} from '@prisma/client';

export function load () {
    let user_roles: string[] = [];

    // This is probably nasty but tbh, i know it works and i don't feel like finding 
    // how to turn an object into an array
    (() => {
        Object.values(Role).forEach((value) => {
            user_roles.push(value);
        });
    })();


    
    return {roles: user_roles};

}

