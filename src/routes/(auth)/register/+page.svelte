<script lang="ts">
    import type { PageData } from './$types';
    import { superForm } from 'sveltekit-superforms/client';
    import Input from "$components/Input.svelte";
    import {Alert, Button} from "flowbite-svelte"
	import { page } from '$app/stores';
	import type { email_registration_schema } from '$lib/schemas';
    
    
    export let data: PageData;

    const {form, errors, enhance, message} = superForm<typeof email_registration_schema, string>(data.form);

    $form.user_role = $page.url.searchParams.get('role') as typeof $form.user_role ?? $form.user_role;

</script>

<form class="flex flex-col space-y-2 mx-auto my-12 max-w-md" method="POST" use:enhance>

    {#if $message}
        <Alert color={ $page.status === 200 ? "green" : "red"}>
            <span class="font-medium">{$message}</span> 
        </Alert>
    {/if}
    
    
    <input type="hidden"  name="user_role" bind:value={$form.user_role} />
    
    <div class="grid md:grid-cols-2 gap-4">
        <Input label="First Name" bind:value={$form.first_name} type="text" name="first_name" error={$errors.first_name} >
        </Input>  
        <Input label="Last Name" bind:value={$form.last_name}  type="text" name="last_name" error={$errors.last_name}  >
        </Input>
    </div>
    <Input label="Email" bind:value={$form.email} type="email" name="email" error={$errors.email} >
        <svg slot="left" aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
    </Input>   
    <Input label="Password" bind:value={$form.password} type="password" name="password" error={$errors.password}  >
    </Input>
    <Input label="Confirm Password" bind:value={$form.password_confirmation} type="password" name="password_confirmation"  error={$errors.password_confirmation} >
    </Input>
    
    <Button type="submit" class="w-full" color="red" size="sm" >Register</Button>
</form>