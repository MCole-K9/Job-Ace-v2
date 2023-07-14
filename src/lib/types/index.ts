import type { SvelteComponent } from "svelte/internal";

export type Link = {
    href?: string ;
    label: string;
    icon?: SvelteComponent | string;
    children?: Link[];
}