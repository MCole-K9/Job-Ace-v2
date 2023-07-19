<script>
	import { page } from "$app/stores";
	import { Role } from "@prisma/client";
	import { Sidebar, SidebarWrapper, SidebarGroup, SidebarItem, SidebarDropdownWrapper, SidebarDropdownItem } from "flowbite-svelte";
	import Links from "./Links.svelte";
	import { user } from "$stores/user-store";
    let spanClass = 'flex-1 ml-3 whitespace-nowrap';


    const dashboard_role_link = {
      [Role.ADMIN]: "/admin/dashboard",
      [Role.USER]: "/dashboard",
      [Role.CANDIDATE]: "/candidate/dashboard",
      [Role.ORGANIZATION_REPRESENTATIVE]: "/org-rep/dashboard",
      [Role.CAREER_COACH]: "/career-coach/dashboard",
      [Role.SUPPORT]: "/support/dashboard",
    }
</script>
<Sidebar>
    <SidebarWrapper divClass='overflow-y-auto py-4 px-3 rounded dark:bg-gray-800'>
      <SidebarGroup>
        <SidebarItem href={dashboard_role_link[$user?.user_role ?? Role.USER] } label="Dashboard">
          <svelte:fragment slot="icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" /><path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" /></svg>
          </svelte:fragment>
        </SidebarItem>

        <!-- Layout Links -->

        {#if $page.data.layout_links}
          <Links links={$page.data.layout_links} />
        {/if}

        <!--  -->
  
      </SidebarGroup>
    </SidebarWrapper>
  </Sidebar>