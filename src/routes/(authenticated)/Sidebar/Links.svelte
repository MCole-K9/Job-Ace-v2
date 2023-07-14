<script lang="ts">
	import type { Link } from "$lib/types";
	import { SidebarDropdownWrapper, SidebarDropdownItem, SidebarItem } from "flowbite-svelte";

    export let links: Link[];
</script>

{#each links as link}
    {#if link.children}
    <SidebarDropdownWrapper label={link.label}>
        <svelte:fragment slot="icon">
        <svelte:component this={link.icon} />
        </svelte:fragment>
        {#each link.children as child}
        <SidebarDropdownItem href={child.href} label={child.label} />
        {/each}
    </SidebarDropdownWrapper>
    {:else}
    <SidebarItem href={link.href} label={link.label}>
        <svelte:fragment slot="icon">
        <svelte:component this={link.icon} />
        </svelte:fragment>
    </SidebarItem>
    {/if}
{/each}