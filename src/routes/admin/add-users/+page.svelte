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
            <Input id="password" type={password_type}/>
            <Toggle on:change={togglePassword}>Show Password</Toggle>
        </div>
    
        <div class="flex flex-col mb-4">
            <Label for="role" class="text">Select the New User's Role</Label>
            <Select items={roles} bind:value={chosen_role} />
        </div>
    
        {#if chosen_role === Role.ADMIN}
            <!--This doesn't need anything, unless for some reason it's necessary to 
            identify admins by name-->
        {:else if chosen_role === Role.SUPPORT}
            <!--This doesn't need anything, unless for some reason it's necessary to 
            identify admins by name-->
    
        {:else if chosen_role === Role.USER}
            <!--Why is there a generic user role?-->
        {:else if chosen_role === Role.ORGANIZATION_REPRESENTATIVE}
            <!--Specify whether the user is part of a business already, or is creating one-->
            <div>
                <p>New User is a:</p>
                <Radio id="recruiter" name="orgRepresentative">Recruiter</Radio>
                <Radio id="manager" name="orgRepresentative">Manager</Radio>
            </div>

        {:else if chosen_role === Role.CAREER_COACH}
            <Input/>
    
        {:else if chosen_role === Role.CANDIDATE}
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
            Select, Radio
            } from 'flowbite-svelte';
    import {Role} from '@prisma/client';
    export let data;

    let roles: {name: string, value: string}[] = data.roles;
    let password_type: 'password' | 'text' = "password";
    let chosen_role: string;

    function submitNewUser(){
        //
    }
    
    function togglePassword(){
        if (password_type === "password"){
            password_type = "text";
        }
        else {
            password_type = "password";
        }

    }

</script>