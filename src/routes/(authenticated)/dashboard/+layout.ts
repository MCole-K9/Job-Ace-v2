import type { LayoutLoad } from './$types';
import layout_links from './layout_links';

export const load = (async () => {


    
    return {
        layout_links
    };
}) satisfies LayoutLoad;