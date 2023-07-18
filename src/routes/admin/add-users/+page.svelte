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
            <form method="POST" use:enhance>
            
                <div class="flex flex-col mb-4">
                    <Label for="email">Email</Label>
                    <Input id="email" class="w-25" type="email"
                        size="sm" name="email" bind:value={$addUserForm.email}/>
                    {#if $errors.email}
                        <Helper>{$errors.email}</Helper>
                    {/if}
                </div>
                
                <div class="flex flex-col mb-4">
                    <Label for="password">Password</Label>
                    <Input id="password" type={passwordType} name="password"
                        bind:value={$addUserForm.password}/>
                    {#if $errors.password}
                        <Helper>{$errors.password}</Helper>
                    {/if}
                    <Toggle on:change={togglePassword}>Show Password</Toggle>
                </div>
            
                <div class="flex flex-col mb-4">
                    <Label for="role" class="text">Select the New User's Role</Label>
                    {#if $errors.role}
                        <Helper>{$errors.role}</Helper>
                    {/if}
                    <Select items={roles} bind:value={$addUserForm.role}
                        name="role" size="sm"/>
                </div>
            
                <!--This entire if block is technically brittle, i am aware-->
                {#if $addUserForm.role === Role.ADMIN}
                    <!--This doesn't need anything, unless for some reason it's necessary to 
                    identify admins by name-->
                {:else if $addUserForm.role === Role.SUPPORT}
                    <!--This doesn't need anything, unless for some reason it's necessary to 
                    identify admins by name-->
            
                {:else if $addUserForm.role === Role.USER}
                    <!--Why is there a generic user role?-->
                {:else if $addUserForm.role === Role.ORGANIZATION_REPRESENTATIVE}
        
                    <div class="flex flex-col mb-4">
                        <Label for="candidate-first-name">First Name</Label>
                        <Input id="candidate-first-name" name="candidate-first-name"
                            size="sm" bind:value={$addUserForm.firstName}/>
                        {#if $errors.firstName}
                            <Helper>{$errors.firstName}</Helper>
                        {/if}
                    </div>
        
                    <div class="flex flex-col mb-4">
                        <Label for="candidate-last-name">Last Name</Label>
                        <Input id="candidate-last-name" name="candidate-last-name"
                            size="sm" bind:value={$addUserForm.lastName}/>
                        {#if $errors.lastName}
                            <Helper>{$errors.lastName}</Helper>
                        {/if}
                    </div>
        
                {:else if $addUserForm.role === Role.CAREER_COACH}
                    <div class="flex flex-col mb-4">
                        <Label for="candidate-first-name">First Name</Label>
                        <Input id="candidate-first-name"
                            size="sm" bind:value={$addUserForm.firstName}/>
                        {#if $errors.firstName}
                            <Helper>{$errors.firstName}</Helper>
                        {/if}
                    </div>
        
                    <div class="flex flex-col">
                        <Label for="candidate-last-name">Last Name</Label>
                        <Input id="candidate-last-name" bind:value={$addUserForm.lastName}
                            size="sm"/>
                        {#if $errors.lastName}
                            <Helper>{$errors.lastName}</Helper>
                        {/if}
                    </div>
            
                {:else if $addUserForm.role === Role.CANDIDATE}
                    <div class="flex flex-col">
                        <Label for="candidate-first-name">First Name</Label>
                        <Input id="candidate-first-name" bind:value={$addUserForm.firstName}
                            size="sm" />
                        {#if $errors.firstName}
                            <Helper>{$errors.firstName}</Helper>
                        {/if}
                    </div>
            
                    <div class="flex flex-col mb-4">
                        <Label for="candidate-last-name">Last Name</Label>
                        <Input id="candidate-last-name" bind:value={$addUserForm.lastName}
                            size="sm"/>
                        {#if $errors.lastName}
                            <Helper>{$errors.lastName}</Helper>
                        {/if}
                    </div>
                {/if}
            
                <Button type="submit" color="blue" class="mt-4">Create New User</Button>
            
            </form>
        </div>
    </div>

    <!--User Feedback section-->
    <div class="flex-none bg-slate-300 shrink-0 h-200
        md:w-72
        lg:w-84 h-15"
        id="resultViewer">
        {#if form?.userData.status === 201}
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
        {:else if form?.userData.status === 500 || form?.userData.status === 422}
            <Alert>Error</Alert>
            <p class="mx-8">{form?.userData.message}</p>

        {:else if !form?.userData.status}
            <Alert
            class="w-full text break-all font-bold">
                Create a User
            </Alert>

            <ul class="mx-8 list-disc">
                <li class="text">created things will show up here.</li>
                <li class="text">they're cool</li>
            </ul>
        <!-- {:else if userData.}
            <p>You may add another user, or do something else</p> -->
        {/if}
    </div>
</div>



<script lang="ts">
    import {Button, Input, Label, Heading, Toggle,
            Select, Alert, Helper
            } from 'flowbite-svelte';
    import {Role} from '@prisma/client';
	import type { ActionData, PageData } from './$types.js';
    import {superForm} from "sveltekit-superforms/client";

    export let data: PageData;
    export let form: ActionData;
    
    $: console.log(form);

    let userData  = {};
    const {form: addUserForm, errors, enhance} = superForm(data.form);

    type MinimalUser = {
        firstName: string,
        lastName: string,
        role: string,
        email: string
    }
    
    // related to changing options depending on role
    let roles: {name: string, value: string}[] = data.roles;
    let passwordType: 'password' | 'text' = "password";

    // submission-related
    let returnedData: MinimalUser = {} as MinimalUser;


    function togglePassword(){
        if (passwordType === "password"){
            passwordType = "text";
        }
        else {
            passwordType = "password";
        }

    }

</script>