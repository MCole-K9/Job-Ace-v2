import {json} from '@sveltejs/kit'

// Modifies a single user
export async function PUT({request, params, locals: {getSession}}){
    return json('lol')
}

// obviously, a delete function is necessary