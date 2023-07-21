<svelte:head>
    <title>Action Center | Job Ace</title>
</svelte:head>

<Heading tag="h3" class="mx-auto text-center
    mt-4 mb-8">
    View & Modify User Informtion
</Heading>

<Input/>

<Breadcrumb>
    <BreadcrumbItem href="/admin">Action Center</BreadcrumbItem>
    <BreadcrumbItem>Users</BreadcrumbItem>
</Breadcrumb>

<!--Basic plan, get all users into a table-->
<div>
    <Table>
        <TableHead>
            <TableHeadCell>
                <Checkbox />
            </TableHeadCell>
            <TableHeadCell>
                ID
            </TableHeadCell>
            <TableHeadCell>
                Role
            </TableHeadCell>
            <TableHeadCell>
                First Name
            </TableHeadCell>
            <TableHeadCell>
                Last Name
            </TableHeadCell>
        </TableHead>
        <TableBody>
            <TableBodyRow>
                <TableBodyCell>
                    <Checkbox />
                </TableBodyCell>
            </TableBodyRow>
        </TableBody>
    </Table>
</div>

<!--Need a component that pops up to display options-->

<script lang="ts">
    import {Heading, Breadcrumb, BreadcrumbItem, Input, Table, TableHead, 
            TableHeadCell, TableBody, TableBodyRow, TableBodyCell, Checkbox
            } from 'flowbite-svelte';
	import type { PageData } from "./$types";

    export let data: PageData;
</script>