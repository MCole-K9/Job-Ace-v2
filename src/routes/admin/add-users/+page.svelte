<svelte:head>
    <title>Add Users | Job Ace</title>
</svelte:head>

<h1>Create New Account</h1>

<div class="flex flex-col">
    <div>
        <label for="email">email</label>
        <input id="email">
    </div>
    
    <div>
        <label for="password">password</label>
        <input id="password">
    </div>

    <div>
        <label for="role">role</label>
        <select on:change={changeNewUserRole} id="role">
            <option selected disabled>Select a Role</option>
            {#each roles as role_option}
                <option value="{role_option}">{role_option}</option>
            {/each}
        </select>
    </div>

    {#if new_user_role === Role.ADMIN}
        <!--This doesn't need anything yet-->
    {:else if new_user_role === Role.SUPPORT}
        <label><input/></label>

    {:else if new_user_role === Role.USER}
        <!--No need to show anything here i think-->
    {:else if new_user_role === Role.ORGANIZATION_REPRESENTATIVE}
        <!--Specify whether the user is part of a business already, or is creating one-->

    {:else if new_user_role === Role.CAREER_COACH}
        <input/>

    {:else if new_user_role === Role.CANDIDATE}
        <label for="candidate-first-name">First Name</label>
        <input id="candidate-first-name">

        <label for="candidate-last-name">Last Name</label>
        <input id="candidate-last-name">
    {/if}

    <button on:click={submitNewUser}>Create New User</button>
</div>

<script lang="ts">
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