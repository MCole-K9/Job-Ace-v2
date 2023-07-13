<script lang="ts">
    import type { LayoutData } from './$types';
    import { page } from '$app/stores';
	import { sineIn } from 'svelte/easing';
	import { Button, Drawer } from 'flowbite-svelte';
    import Sidebar from './Sidebar.svelte';
    let hidden2 = false;
     
    let transitionParams = {
        x: -320,
        duration: 200,
        easing: sineIn
    };

    export let data: LayoutData;

	
    
    
</script>

<div class="text-center">
  <Button color="red" on:click={() => (hidden2 = false)}>Show navigation</Button>
</div>
<Drawer transitionType="fly" {transitionParams} bind:hidden={hidden2} id='m-sidebar'>
    <div class='flex items-center'>     
        <Sidebar />
    </div>
</Drawer>
<div class="flex flex-row min-h-screen">
    <aside class="sidebar w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in">
        <Sidebar />
    </aside>
	<main class="flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in p-6">
		<slot />
	</main>
</div>