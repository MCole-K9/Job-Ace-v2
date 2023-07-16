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
                <Input id="password" type={passwordType} bind:value={password}
                    size="sm"/>
                <Helper>Test</Helper>
                <Toggle on:change={togglePassword}>Show Password</Toggle>
            </div>
        
            <div class="flex flex-col mb-4">
                <Label for="role" class="text">Select the New User's Role</Label>
                <Select items={roles} bind:value={chosenRole} 
                    size="sm"/>
            </div>
        
            <!--This entire if block is technically brittle, i am aware-->
            {#if chosenRole === Role.ADMIN}
                <!--This doesn't need anything, unless for some reason it's necessary to 
                identify admins by name-->
            {:else if chosenRole === Role.SUPPORT}
                <!--This doesn't need anything, unless for some reason it's necessary to 
                identify admins by name-->
        
            {:else if chosenRole === Role.USER}
                <!--Why is there a generic user role?-->
            {:else if chosenRole === Role.ORGANIZATION_REPRESENTATIVE}
    
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
    
            {:else if chosenRole === Role.CAREER_COACH}
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
        
            {:else if chosenRole === Role.CANDIDATE}
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

    <!--User Feedback section-->
    <div class="flex-none bg-slate-300 shrink-0 h-200
        md:w-72
        lg:w-84 h-15"
        id="resultViewer">
        {#if submissionResult === 'SUCCESS'}
            <Alert 
            class="w-full text break-all
            bg-green-400 font-bold">
                User Succesfully Created
            </Alert>

            <ul class="mx-8">
                <li>Email: {returnedData.email}</li>
                <li>Role: {returnedData.role}</li>
                <li>First Name: {returnedData.firstName}</li>
                <li>Last Name: {returnedData.lastName}</li>
            </ul>
        {:else if submissionResult === 'FAIL'}
            <Alert>Error</Alert>
            <p class="mx-8">Cannot Complete your Request: Error Code</p>
            <ul>
                {#each errorMessages as message}
                    <li></li>
                {/each}
            </ul>
        {:else if submissionResult === 'UNINITIATED'}
            <Alert
            class="w-full text break-all font-bold">
                Create a User
            </Alert>

            <ul class="mx-8 list-disc">
                <li class="text">created things will show up here.</li>
                <li class="text">they're cool</li>
            </ul>
        {:else if submissionResult === 'RESET'}
            <p>You may add another user, or do something else</p>
        {/if}
    </div>
</div>



<script lang="ts">
    import {Button, Input, Label, Heading, Toggle,
            Select, Alert, Helper
            } from 'flowbite-svelte';
    import {Role} from '@prisma/client';
	import { AuthApiError } from '@supabase/supabase-js';
    export let data;

    type MinimalUser = {
        firstName: string,
        lastName: string,
        role: string,
        email: string
    }
    
    // related to changing options depending on role
    let roles: {name: string, value: string}[] = data.roles;
    let passwordType: 'password' | 'text' = "password";
    let chosenRole: string;

    // related to the values entered by the user
    // worth looking into: whether or not it's wise 
    let email: string = "";
    let firstName: string = "";
    let lastName: string = "";
    let password: string ="";

    // submission-related
    let submissionResult: 'SUCCESS' | 'FAIL' | 'UNINITIATED' | 'RESET' = 'UNINITIATED';
    let returnedData: MinimalUser = {} as MinimalUser;
    let errorMessages: string[] = [];


    function submitNewUser(){
        // validate for presence here
        fetch('/api/admin/users', {
            method: 'POST',
            body: JSON.stringify({
                userData: {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    password: password,
                    role: chosenRole
                }
            }),
            headers: {
                'Content-Type': 'application/json'
            }})
        .then((response: Response) => {
            if (response.status === 201){
                submissionResult = 'SUCCESS';
                return response.json();
            }
            else if (response.status === 500){
                submissionResult = 'FAIL';
                // ↓ this feels morally wrong somehow, but: TESTING
                return new Promise((resolve, reject) => {
                    reject(response.json());
                });
            }
        })
        .then((data) => {
            returnedData.email = data.email;
            returnedData.firstName = data.first_name;
            returnedData.lastName = data.last_name;
            returnedData.role = data.user_role;

            setTimeout(() => submissionResult = 'RESET', 5000);
        }, 
        (failResult)=> {
            console.log(failResult);

            // the types of error i need to check for are:
            // * ZodError (500) (this shouldn't really matter for the frontend, since i'll also frontend validate)
            // * AuthApiError (500)
            // * Prisma Error (maybe?) (500)
            // * General Server Error on the chance that it's unreachable (404)

        })
    }
    
    function togglePassword(){
        if (passwordType === "password"){
            passwordType = "text";
        }
        else {
            passwordType = "password";
        }

    }

    function checkPresence(){
        switch (chosenRole){
            case Role.ADMIN:

        }
    }

</script>