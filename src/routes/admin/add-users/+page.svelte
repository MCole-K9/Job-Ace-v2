<svelte:head>
    <title>Add Users | Job Ace</title>
</svelte:head>

<Heading tag="h3" class="mx-auto max-w-fit text-center mt-4 mb-8">
    Create New Account
</Heading>

<!--Took forever to remember that tailwind is 'mobile first'-->
<div class="flex flex-col-reverse mx-auto max-w-fit
    lg:flex-row 
    md:flex-row">
    <!--Section for entering information-->
    <div class="bg-slate-200 px-8 py-4 flex-auto
        lg:w-40px">
        <div class="flex flex-col max-w-fit">
            <div class="flex flex-col mb-4">
                <Label for="email">Email</Label>
                <Input id="email" class="w-25" type="email"
                    size="sm" bind:value={email}/>
                <Helper>Test</Helper>
            </div>
            
            <div class="flex flex-col mb-4">
                <Label for="password">Password</Label>
                <Input id="password" type={password_type} bind:value={password}
                    size="sm"/>
                <Helper>Test</Helper>
                <Toggle on:change={togglePassword}>Show Password</Toggle>
            </div>
        
            <div class="flex flex-col mb-4">
                <Label for="role" class="text">Select the New User's Role</Label>
                <Select items={roles} bind:value={chosen_role} 
                    size="sm"/>
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
                <div class="mb-4">
                    <p>New User is a:</p>
                    <Radio id="recruiter" name="orgRepresentative" bind:group={organizationalRole}>Recruiter</Radio>
                    <Radio id="manager" name="orgRepresentative" bind:grou={organizationalRole}>Manager</Radio>
                </div>
    
                <div class="flex flex-col mb-4">
                    <Label for="candidate-first-name">First Name</Label>
                    <Input id="candidate-first-name" bind:value={firstName}
                        size="sm"/>
                    <Helper>Test</Helper>
                </div>
    
                <div class="flex flex-col mb-4">
                    <Label for="candidate-last-name">Last Name</Label>
                    <Input id="candidate-last-name" bind:value={lastName}
                        size="sm"/>
                    <Helper>Test</Helper>
                </div>
    
            {:else if chosen_role === Role.CAREER_COACH}
                <div class="flex flex-col mb-4">
                    <Label for="candidate-first-name">First Name</Label>
                    <Input id="candidate-first-name" bind:value={firstName}
                        size="sm"/>
                    <Helper>Test</Helper>
                </div>
    
                <div class="flex flex-col">
                    <Label for="candidate-last-name">Last Name</Label>
                    <Input id="candidate-last-name" bind:value={lastName}
                        size="sm"/>
                    <Helper>Test</Helper>
                </div>
        
            {:else if chosen_role === Role.CANDIDATE}
                <div class="flex flex-col">
                    <Label for="candidate-first-name">First Name</Label>
                    <Input id="candidate-first-name" bind:value={firstName}
                        size="sm"/>
                    <Helper>Test</Helper>
                </div>
        
                <div class="flex flex-col mb-4">
                    <Label for="candidate-last-name">Last Name</Label>
                    <Input id="candidate-last-name" bind:value={lastName}
                        size="sm"/>
                    <Helper>Test</Helper>
                </div>
            {/if}
        
            <Button on:click={submitNewUser} type="submit" color="blue" class="mt-4">Create New User</Button>
    
        </div>
    </div>

    <div class="flex-none bg-slate-300 shrink-0 h-200
        md:w-72
        lg:w-84 h-15"
        id="resultViewer">
        {#if submission_result === 'SUCCESS'}
            <Alert 
            class="w-full
            bg-green-400">
                User Succesfully Created
            </Alert>

            <div>
                <p>Email: </p>
                <p>Role: </p>
                <p>First Name:</p>
                <p>Last Name:</p>
            </div>
        {:else if submission_result === 'FAIL'}
            <Alert>Cannot Find Route: (Information)</Alert>
        {:else if submission_result === 'UNINITIATED'}
            <Alert
            class="w-full text break-all 
            bg-green-400">
                I'm just here to fill spacessssssssssssssssssssssssssssssssssssssssssssssssssssssss
            </Alert>

            <p 
            class="mx-8">
                created things will show up here.
            </p>
        {/if}
    </div>
</div>



<script lang="ts">
    import {Button, Input, Label, Heading, Toggle,
            Select, Radio, Alert, Helper
            } from 'flowbite-svelte';
    import {Role} from '@prisma/client';
    export let data;
    
    // related to changing options depending on role
    let roles: {name: string, value: string}[] = data.roles;
    let password_type: 'password' | 'text' = "password";
    let chosen_role: string;

    // related to the values entered by the user
    // worth looking into: whether or not it's wise 
    let email: string = "";
    let firstName: string = "";
    let lastName: string = "";
    let organizationalRole: string = "";
    let password: string ="";

    // submission-related
    let submission_result: 'SUCCESS' | 'FAIL' | 'UNINITIATED' = 'UNINITIATED';


    function submitNewUser(){
        // validate for presence here
        fetch('/api/admin/users', {
            method: 'POST',
            body: JSON.stringify({
                chosenRole: chosen_role,
                userData: {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    organizationalRole: organizationalRole,
                    password: password
                }
            }),
            headers: {
                'Content-Type': 'application/json'
            }})
        .then((response) => {
            if (response.status === 201){
                return response.json();

            }
            else if (response.status === 404){
                return response.json();
            }
            else if (response.status === 500){
                
                return response.json();
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

    function checkPresence(){
        switch (chosen_role){
            case Role.ADMIN:

        }
    }

</script>