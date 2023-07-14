import type { Link } from '$lib/types';
import type { LayoutLoad } from './$types';


const layout_links: Link[] = [
    {
        href: "/test",
        label: "Test",
    }
        
]
export const load = (async () => {


    
    return {
        layout_links
    };
}) satisfies LayoutLoad;