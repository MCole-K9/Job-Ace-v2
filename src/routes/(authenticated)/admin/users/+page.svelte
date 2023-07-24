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
    <p class="max-w-fit text-right ml-auto mr-8">Showing {users.length} of Y Users</p>
    <TableSearch bind:inputValue={searchTerm}>
            <TableHead>
                <TableHeadCell>
                    <Checkbox bind:checked={isSelectAll} on:click={() => {

                        if (isSelectAll){
                            
                            selectedUsers = [];
                            selectedUserIds = [];
                        }
                        else {
                            // i need to do some kind of deep clone of this,
                            // as it currently deletes items from uses when reset
                            selectedUsers = JSON.parse(JSON.stringify(users));

                            users.forEach(user => {
                                if (!selectedUserIds.includes(user.user_id)){
                                    selectedUserIds.push(user.user_id)
                                }

                            })

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
                <!--Object weirdness, it looks bad but i'm keeping it in case 
                    I have to send other data along with the users, otherwise 
                    I'd just destructure it-->
                {#each users as user (user.user_id)}
                    <TableBodyRow>
                        <TableBodyCell>
                            <Checkbox value={user.user_id} bind:group={selectedUserIds}
                            on:click={() => {

                                if(selectedUsers.includes(user)){
                                    isSelectAll = false;
                                    // this is not properly unselecting the object properly, 
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
    </TableSearch>
</div>


<!--Need a component that pops up to display options-->
<div class="fixed bottom-0 h-24 border-2 min-w-full mx-0 px-4 pt-4 bg-white">
    {#if selectedUsers.length >= 2}
        <p>{selectedUsers.length} Users Selected</p>
        <!--Options: 
            - Delete Users (Require confirmation first)-->
    {:else if selectedUsers.length === 1}
        <p>User Selected: ID: {selectedUsers[0].user_id} ({selectedUsers[0].user_role})
            {selectedUsers[0].first_name + ' ' + selectedUsers[0].last_name}</p>
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
    import type { UserInfo } from '$lib/types/index';

    export let data: PageData;
    let users = data.users.users;
    
    let searchTerm: string;
    let isSelectAll: boolean = false;
    let selectedUserIds: string[] = [];
    let selectedUsers: UserInfo[] = [];


</script>