import type { Link } from "$lib/types";
import { AdressBookSolid, AddressCardSolid} from "flowbite-svelte-icons"

const layout_links:Link[] = [
    {
        label: "Organization",
        href: "/org-rep/organization",
        icon: AdressBookSolid,
    }

]


export default layout_links;