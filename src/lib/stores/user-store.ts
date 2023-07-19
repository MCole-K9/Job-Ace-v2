import type { UserInfo } from '$types';
import { writable } from 'svelte/store';

function create_user_info() {
	const { subscribe, set, update } = writable<UserInfo | null>(null);

    let user_info: UserInfo | null ;
    subscribe((value) => user_info = value )

	return {
		subscribe,
        set,
        is_admin: () => {
            return user_info?.user_role  === "ADMIN"
        },
        is_user: () => {
            return user_info?.user_role  === "USER"
        },
        is_candidate: () => {
            return user_info?.user_role  === "CANDIDATE"
        },
        is_org_rep: () => {
            return user_info?.user_role  === "ORGANIZATION_REPRESENTATIVE"
        },
        get_name: () => {
            console.log(user_info);
            
            return user_info?.first_name + " " + user_info?.last_name
        }
		
	};
}

export const user = create_user_info();