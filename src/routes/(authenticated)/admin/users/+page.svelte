<svelte:head>
    <title>View Users | Job Ace</title>
</svelte:head>

<Heading tag="h3" class="mx-auto text-center
    mt-4 mb-8">
    View & Modify User Information
</Heading>

<Breadcrumb>
    <BreadcrumbItem href="/admin">Action Center</BreadcrumbItem>
    <BreadcrumbItem>Users</BreadcrumbItem>
</Breadcrumb>

<div>
    <p class="max-w-fit text-right ml-auto mr-8">Showing {users.length} of {totalUsers} Users</p>
    <!--Using the Raw Flowbite component because TableSearch doesn't let you bind `string | null`-->

    <div class="bg-slate-300 p-6 flex flex-row max-w-min">
        <Search size="md" bind:value={searchValue} class="w-64 flex-shrink"  
            placeholder="Enter a search string" >
        </Search>
        <Button color="blue" size="sm" class="ml-0" on:click={() =>{
            $searchString = searchValue;
            // i have conditions for empty string and null to anticipate 
            // problems with sveltekit search params. might not be necessary
            if ($searchString === '') {
                getUsers();
            }
            else if ($searchString === null){
                getUsers();
            }
            else{
                getUsers(0, $searchString);
            }

        }}>
            Search
        </Button>
    </div>
    
    <Table>
            <TableHead>
                <TableHeadCell>
                    <Checkbox bind:checked={isSelectAll} on:click={() => {

                        if (isSelectAll){
                            
                            selectedUsers = [];
                            selectedUserIds = [];
                        }
                        else {
                            // currently this makes a deep copy of all of the 
                            // users that currently exist in the users array, 
                            // then grabs the id and pushes them all into an 
                            // array
                            selectedUsers = JSON.parse(JSON.stringify(users));

                            users.forEach(user => {
                                if (!selectedUserIds.includes(user.user_id)){
                                    selectedUserIds.push(user.user_id)
                                }

                            })

                            // the spread is just to satisfy svelte's assignment
                            // based reactivity
                            selectedUserIds = [...selectedUserIds];
                            
                        }

                        console.log(selectedUserIds)
                        console.log(selectedUsers);
                    }}/>
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
                {#each users as user (user.user_id)}
                    <TableBodyRow>
                        <TableBodyCell>
                            <Checkbox value={user.user_id} bind:group={selectedUserIds}
                            on:click={() => {

                                if(selectedUsers.includes(user)){
                                    isSelectAll = false;
                                    // this is not properly unselecting the object, 
                                    // nor is it changing isSelectAll i think. it might be 
                                    // because `includes` is checking references (duh)
                                    // and the reference to `user` (the table value) and the 
                                    // object with the same value are different objects (thanks)
                                    // to the bastardized deep-copy made with JSON. solution later

                                    let userInfoIndex = selectedUsers.findIndex(value => value === user);
                                    selectedUsers.splice(userInfoIndex, 1);
                                    selectedUsers = [...selectedUsers];

                                    let userIdIndex = selectedUserIds.findIndex(value => value === user.user_id);
                                    selectedUserIds.splice(userIdIndex, 1);
                                    selectedUserIds = [...selectedUserIds];

                                }
                                else {
                                    selectedUsers = [...selectedUsers, user];
                                }

                                console.log(selectedUsers);
                                console.log(selectedUserIds);
                            }}/>
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
        </Table>
        
</div>
{#if users.length >= totalUsers}
    <div class="min-w-max">
        <p class="text text-center italic">End of Record</p>
    </div>
{:else}
    <div class="min-w-max mx-auto">
        <Button color="red" class="w-max mx-auto"
            on:click={() => {
                page++;
                getUsers(page, $searchString ?? undefined);
            }}>Load More</Button>
    </div>
{/if}


<!--
    The intention of this section is to use a drawer to allow the user to 
    interact with the selected user records. Interactions are:
    - Modify User
        - Change role
    - Delete User(s)
    - View User Action Logs (new page)
    - View User Infraction (new page)
-->
<div class="fixed bottom-0 h-24 border-2 min-w-full mx-0 px-4 pt-4 bg-white">
    {#if selectedUsers.length >= 2}
        <p>{selectedUsers.length} Users Selected</p>
        <!--Case: More than One user selected

            Options: 
            - Delete Users (Require confirmation first)-->
    {:else if selectedUsers.length === 1}
        <p>User Selected: ID: {selectedUsers[0].user_id} ({selectedUsers[0].user_role})
            {selectedUsers[0].first_name + ' ' + selectedUsers[0].last_name}</p>
        <!--Case: Single User selected
            
            Options: 
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
            Search, Button} from 'flowbite-svelte';
	import { onMount } from "svelte";

    import type { UserInfo } from '$lib/types/index';
    import { ssp, queryParam } from 'sveltekit-search-params';
    
    let searchValue: string = '';
    const searchString = queryParam("q", ssp.string());
    
    let users: UserInfo[] = [];
    let totalUsers: number;
    
    
    let isSelectAll: boolean = false;
    let selectedUserIds: string[] = [];
    let selectedUsers: UserInfo[] = [];
    let timer; // i don't remember what this was *supposed* to be used for
    let page: number;

    async function getUsers(page: number = 0, searchString: string = ''){
        let response = await fetch(`/api/admin/users?string=${searchString}&page=${page}`, {method: 'GET'});
        if (response.status === 200){
            let data = await response.json();

            // i believe both of these don't currently doesn't work as intended, as they add an empty index
            // (because the array is empty) before spreading the returned data
            if (page === 0){
                users = [...data.users]
                totalUsers = data.usersCount;
                console.log('page: ' + page);
            }
            else {
                users = [users, ...data.users];
                totalUsers = data.usersCount;
                console.log('page: ' + page);
            }
            
        }
    }

    onMount(() => {
        console.log($searchString);
        page = 0;

        // using empty string and null as conditions to prevent potential, 
        // and not discovered sveltekit search params problems
        if ($searchString === null){
            getUsers();
        }
        else if ($searchString === ''){
            getUsers();
        }
        else if ($searchString !== ''){
            getUsers(0, $searchString);
            searchValue = $searchString;
        }
    });
    

</script>