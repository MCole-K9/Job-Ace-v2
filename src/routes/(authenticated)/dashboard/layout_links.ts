import type { Link } from '$lib/types';
import { AdressBookSolid, AddressCardSolid} from "flowbite-svelte-icons"



const layout_links: Link[] = [
    {
        
        label: "Test",
        icon: AdressBookSolid,
        children: [
            {
                label: "Test 1",
                href: "/test1"
            },
        ]
    },
    {
        label: "Test 2",
        href: "/test2",
        icon: AddressCardSolid
    }
    
        
]

export default layout_links;