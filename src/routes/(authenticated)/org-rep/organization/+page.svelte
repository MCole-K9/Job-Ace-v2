<script lang="ts">
    import type { PageData } from './$types';
    import { Tabs, TabItem } from 'flowbite-svelte';
    
    export let data: PageData;

    $: ({org_rep} = data)

    $: user_is_org_admin = org_rep?.org_role === "MANAGING_REPRESENTATIVE"
</script>


<h3 class="text-4xl text-center font-bold">{user_is_org_admin ? 'Manage': ''} Organization</h3>
{#if user_is_org_admin }
    <p class="text-center mb-5">Edit your Organizations Details Below</p>
{/if}

  
<Tabs style="full" defaultClass="flex rounded-lg divide-x divide-gray-200 shadow dark:divide-gray-700 mt-10">
  <TabItem class="w-full" open>
    <span slot="title">Register Organization</span>

    

  </TabItem>
  <TabItem class="w-full">
    <span slot="title">Connect To Organization</span>
    
  </TabItem>
</Tabs>
