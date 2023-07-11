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
            <Input id="password" type={password_type} bind:value={password}/>
            <Toggle on:change={togglePassword}>Show Password</Toggle>
        </div>
    
        <div class="flex flex-col mb-4">
            <Label for="role" class="text">Select the New User's Role</Label>
            <Select items={roles} bind:value={chosen_role} />
        </div>
    
        <!--This entire if block is technically brittle, i am aware-->
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
                <Radio id="recruiter" name="orgRepresentative" bind:group={org_rep_role}>Recruiter</Radio>
                <Radio id="manager" name="orgRepresentative" bind:grou={org_rep_role}>Manager</Radio>
            </div>

            <div class="flex flex-col">
                <Label for="candidate-first-name">First Name</Label>
                <Input id="candidate-first-name" bind:value={first_name}/>
            </div>

            <div class="flex flex-col">
                <Label for="candidate-last-name">Last Name</Label>
                <Input id="candidate-last-name" bind:value={last_name}/>
            </div>

        {:else if chosen_role === Role.CAREER_COACH}
            <div class="flex flex-col">
                <Label for="candidate-first-name">First Name</Label>
                <Input id="candidate-first-name" bind:value={first_name}/>
            </div>

            <div class="flex flex-col">
                <Label for="candidate-last-name">Last Name</Label>
                <Input id="candidate-last-name" bind:value={last_name}/>
            </div>
    
        {:else if chosen_role === Role.CANDIDATE}
            <div class="flex flex-col">
                <Label for="candidate-first-name">First Name</Label>
                <Input id="candidate-first-name" bind:value={first_name}/>
            </div>
    
            <div class="flex flex-col">
                <Label for="candidate-last-name">Last Name</Label>
                <Input id="candidate-last-name" bind:value={last_name}/>
            </div>
        {/if}
    
        <Button on:click={submitNewUser} type="submit" color="blue" class="mt-8">Create New User</Button>

        <div class="h-12">
            <!--If: successful, not successful, incomplete (depends on role)-->
            {#if submission_result === 201}
                <Alert>User Succesfully Created</Alert>
            {:else if submission_result === 404}
                <Alert>Cannot Find Route: (Information)</Alert>
            {:else if submission_result === 500}
                <Alert>Cannot Create User: (Reason)</Alert>
            {:else}
                <Alert>I'm just here to fill space</Alert>
            {/if}
        </div>
    </div>
</div>


<script lang="ts">
    import {Button, Input, Label, Heading, Toggle,
            Select, Radio, Alert
            } from 'flowbite-svelte';
    import {Role} from '@prisma/client';
    export let data;
    
    // related to changing options depending on role
    let roles: {name: string, value: string}[] = data.roles;
    let password_type: 'password' | 'text' = "password";
    let chosen_role: string;

    // related to the values entered by the user
    // worth looking into: whether or not it's wise 
    let first_name: string = "";
    let last_name: string = "";
    let org_rep_role: string = "";
    let password: string ="";

    // submission-related
    let submission_result = 0;


    function submitNewUser(){
        fetch('/api/admin/users', {body: JSON.stringify({
                userRole: chosen_role,
                firstName: first_name,
                last_name: last_name,
                organizationRepresentativeRole: org_rep_role,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            }})
        .then((response) => {
            if (response.status === 201){
                // this worked
            }
            else if (response.status === 404){
                // for some reason, route not found
            }
            else if (response.status === 500){
                // the server has experienced some error, 
            }
        })
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