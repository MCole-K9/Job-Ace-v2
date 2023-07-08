<svelte:head>
    <title>Add Users | Job Ace</title>
</svelte:head>

<Heading tag="h3" class="mx-auto max-w-fit text-center mt-4 mb-8">
    Create New Account
</Heading>

<div class="max-w-fit mx-auto bg-slate-200 px-8 py-4">
    <div class="flex flex-col max-w-fit">
        <div class="flex flex-col mb-4">
            <Label for="email">Email</Label>
            <Input id="email" class="w-25" type="email"/>
        </div>
        
        <div class="flex flex-col mb-4">
            <Label for="password">Password</Label>
            <Input id="password" type="password"/>
            <Toggle>Show Password</Toggle>
        </div>
    
        <div class="flex flex-col mb-4">
            <Label for="role" class="text">Select the New User's Role</Label>
            <!--Mildly annoyed i need to change this to flowbite's whatever select thing-->
            <select on:change={changeNewUserRole} id="role">
                <option selected disabled>Select a Role</option>
                {#each roles as role_option}
                    <option value="{role_option}">{role_option}</option>
                {/each}
            </select>
        </div>
    
        {#if new_user_role === Role.ADMIN}
            <!--This doesn't need anything, unless for some reason it's necessary to 
            identify admins by name-->
        {:else if new_user_role === Role.SUPPORT}
            <!--This doesn't need anything, unless for some reason it's necessary to 
            identify admins by name-->
    
        {:else if new_user_role === Role.USER}
            <!--Why is there a generic user role?-->
        {:else if new_user_role === Role.ORGANIZATION_REPRESENTATIVE}
            <!--Specify whether the user is part of a business already, or is creating one-->
    
        {:else if new_user_role === Role.CAREER_COACH}
            <Input/>
    
        {:else if new_user_role === Role.CANDIDATE}
            <div class="flex flex-col">
                <Label for="candidate-first-name">First Name</Label>
                <Input id="candidate-first-name"/>
            </div>
    
            <div class="flex flex-col">
                <Label for="candidate-last-name">Last Name</Label>
                <Input id="candidate-last-name"/>
            </div>
    
    
        {/if}
    
        <Button on:click={submitNewUser} type="submit" color="blue" class="mt-8">Create New User</Button>

        <div>

        </div>
    </div>
</div>


<script lang="ts">
    import {Button, Input, Label, Heading, Toggle,
            Select} from 'flowbite-svelte';
    import {Role} from '@prisma/client';
    export let data;

    let roles: string[] = data.roles;
    let new_user_role: string = Role.USER;

    function changeNewUserRole(){
        let select = <HTMLSelectElement>document.getElementById('role');
        new_user_role = select.selectedOptions[0].value;
    }

    function submitNewUser(){
        //
    }
    
</script>