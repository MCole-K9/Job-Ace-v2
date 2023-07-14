import type { Link } from '$lib/types';
import { AdressBookSolid} from "flowbite-svelte-icons"



const layout_links: Link[] = [
    {
        
        label: "Test",
        icon: AdressBookSolid,
        children: [
            {
                label: "Test 1",
                href: "/test1"
            }
        ]
    },
    
        
]

export default layout_links;