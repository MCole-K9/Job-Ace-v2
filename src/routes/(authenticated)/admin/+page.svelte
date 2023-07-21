<svelte:head>
    <title>Action Center | Job Ace</title>
</svelte:head>

<Heading tag="h3" class="mx-auto text-center
    mt-4 mb-8">
    Admin Action Center
</Heading>

<!--
    Current thoughts:
    * 4 present functions are fine
-->

<a href="/admin/add-users">Add Users</a>
<a href="/admin/users">View or Edit Users</a>
<a href="/admin/infractions">View Recent Infractions</a>
<a href="/admin/logs">View Site-Wide Logs</a>

<script lang="ts">
    import {Heading, Button} from 'flowbite-svelte';
	import type { PageData } from "./$types";

    export let data: PageData;
</script>