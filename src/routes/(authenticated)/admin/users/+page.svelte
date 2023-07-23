<svelte:head>
    <title>View Users | Job Ace</title>
</svelte:head>

<Heading tag="h3" class="mx-auto text-center
    mt-4 mb-8">
    View & Modify User Informtion
</Heading>

<Breadcrumb>
    <BreadcrumbItem href="/admin">Action Center</BreadcrumbItem>
    <BreadcrumbItem>Users</BreadcrumbItem>
</Breadcrumb>

<!--Basic plan, get all users into a table-->
<div>
    <TableSearch bind:inputValue={searchTerm}>
            <TableHead>
                <TableHeadCell>
                    <Checkbox on:change={toggleSelectAll} bind:checked={isSelectAll}/>
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
                <!--Object weirdness, it looks bad but i'm keeping it in case 
                    I have to send other data along with the users, otherwise 
                    I'd just destructure it-->
                {#each data.users.users as user (user.user_id)}
                    <TableBodyRow>
                        <TableBodyCell>
                            <Checkbox />
                        </TableBodyCell>
                        <TableBodyCell>
                            {user.user_id}
                        </TableBodyCell>
                        <TableBodyCell>
                            {user.user_role}
                        </TableBodyCell>
                        <TableBodyCell>
                            {user.first_name}
                        </TableBodyCell>
                        <TableBodyCell>
                            {user.last_name}
                        </TableBodyCell>
                    </TableBodyRow>
                {/each}
                
            </TableBody>
    </TableSearch>
</div>


<!--Need a component that pops up to display options-->
<div class="fixed bottom-0 h-24 border-2 min-w-full mx-0 px-4 pt-4">
    {#if selectedUsers.length >= 2}
        <p>(Number) Users Selected</p>
        <!--Options: 
            - Delete Users (Require confirmation first)-->
    {:else if selectedUsers.length === 1}
        <p>User Selected: (User Id) (User Role) (User Name)</p>
        <!--Options: 
            - Modify User Informtion
            - Delete User
            - View Infractons for User
            - View Logs for User-->
    {:else}
        <div>
            <p class="">0 Users Selected</p>
        </div>
        <div>
            <p>
                You may select a single user, or multiple users, and perform
                relevant actions.
            </p>
        </div>
        <!--Prompts:
            - Check User to access related actions, or selecte multiple users 
            to delete them-->
    {/if}
    
    <!--Show No users selected
        or show *user* selected
        or show *users* selected, and off the ability to view them
            - if all the users are selected, don't bother to make a list
            - truncate the list unless the users chooses to see them all
            - consider: showing a count of users selected/all loaded in users
            - consider: just showing the list (no names or ids etc.) is number >32
            - -->

    
</div>

<script lang="ts">
    import {Heading, Breadcrumb, BreadcrumbItem, Input, Table, TableHead, 
            TableHeadCell, TableBody, TableBodyRow, TableBodyCell, Checkbox, 
            TableSearch} from 'flowbite-svelte';
	import type { PageData } from "./$types";

    export let data: PageData;
    
    let searchTerm: string;
    let isSelectAll: boolean = false;
    let isUsersSelected: boolean = false;
    const selectedUsers: string[] = [];


    function toggleSelectAll(){
        // how do i select and tick all of the rows?
    }

    function addUserToList(id: string){
        // this is probably quite straightforward
    }

</script>