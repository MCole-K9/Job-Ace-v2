<script lang="ts">
    import { Alert, Button } from 'flowbite-svelte';
    import type { PageData } from './$types';
	import Input from '$components/Input.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { page } from '$app/stores';
    
    export let data: PageData;

    const {form, errors, message} = superForm(data.form)
</script>



<div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto">
        <form method="POST" class="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">

            {#if $message}
                <Alert color="red" class="text-center">
                    <span class="font-medium">{$message}</span> 
                </Alert>
            {/if}
            
            <p class="text-center text-lg font-medium">Sign in to your account</p>
    
            <Input label="Email" name="email" type="email" value={$form.email} error={$errors.email}> </Input>
            <Input label="Password" name="password" type="password" value={$form.password}> </Input>
    
            <Button type="submit" class="w-full" color="red" size="sm" >Sign In</Button>
        
            <p class="text-center text-sm text-gray-500">
                No account?
                <a class="underline" href="/register">Sign up</a>
            </p>
        </form>
    </div>
</div>