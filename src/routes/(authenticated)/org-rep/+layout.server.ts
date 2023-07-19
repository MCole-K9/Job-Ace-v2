import prisma from '$lib/server/database';
import type { LayoutServerLoad } from './$types';

export const load = (async ({locals}) => {
    return {
        org_rep:  prisma.organizationRepresentative.findUniqueOrThrow({
            where: {
                user_id: locals.user_info?.user_id
            },
            include: {
                Organization: true
            }
        })
    };
}) satisfies LayoutServerLoad;