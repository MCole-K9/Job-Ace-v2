<script lang="ts">
	import type { LayoutData } from './$types';
	import { page } from '$app/stores';
	import { sineIn } from 'svelte/easing';
	import { Avatar, Button, Drawer, DropdownHeader } from 'flowbite-svelte';
	import {Sidebar} from './Sidebar';
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Dropdown,
		DropdownItem,
		Chevron,
		DropdownDivider
	} from 'flowbite-svelte';

	let drawerHidden = true;

	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};

	export let data: LayoutData;
</script>

<Navbar let:hidden let:toggle>
	<NavBrand   >
        <NavHamburger on:click={()=>{ drawerHidden = false}} />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
			Job Ace
		</span>
	</NavBrand>

    <!-- Avatar Menu Component -->
	<div class="flex items-center md:order-2">
		<Avatar id="avatar-menu" alt="MC" />
	</div>
	<Dropdown placement="bottom" triggeredBy="#avatar-menu">
		<DropdownHeader>
			<span class="block text-sm"> Bonnie Green </span>
			<span class="block truncate text-sm font-medium"> name@flowbite.com </span>
		</DropdownHeader>
		<DropdownItem>Dashboard</DropdownItem>
		<DropdownItem>Settings</DropdownItem>
		<DropdownItem>Earnings</DropdownItem>
		<DropdownDivider />
		<DropdownItem>Sign out</DropdownItem>
	</Dropdown>
    <!-- Avatar Menu Component  -->
</Navbar>
<Drawer transitionType="fly" {transitionParams} bind:hidden={drawerHidden} id="m-sidebar">
	<div class="flex items-center">
		<Sidebar />
	</div>
</Drawer>
<div class="flex flex-row min-h-screen">
	<aside
		class="sidebar w-64 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in"
	>
		<Sidebar />
	</aside>
	<main class="flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in p-6">
		<slot />
	</main>
</div>
