<svelte:head>
    <title>Recent Infractions | Job Ace</title>
</svelte:head>

<Heading tag="h3" class="max-w-fit text-center mb-8 mt-4 mx-auto">
    Recent Infractions
</Heading>

<Breadcrumb>
    <BreadcrumbItem href="/admin">Action Center</BreadcrumbItem>
    <BreadcrumbItem>Infractions</BreadcrumbItem>
</Breadcrumb>

<!--
    At time of writing, the nature of the infraction table isn't clear to me,
    but the intention is to have this page, which shows the latest issued in-
    fractions (i.e. shows the latest [some ammount] of infractions among all 
    users). this is an "at a glance" feature.

    admins should be able to click on an infracton and get taken to the user's 
    sub-page, with focus on that infraction item

    a sub-page should use a route paramter corresponding to the id of the user 
    to show the infractions that the users have, along with tools for resolving
    them
-->

<script lang="ts">
    import {Heading, Breadcrumb, BreadcrumbItem} from 'flowbite-svelte';

</script>