import type { LayoutLoad } from './$types';
import layout_links from './layout_links';

export const load = (async ({data}) => {
    return {
        ...data,
        layout_links
    };
}) satisfies LayoutLoad;