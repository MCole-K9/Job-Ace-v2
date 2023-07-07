<script lang="ts">
	import { Helper, Input, Label } from "flowbite-svelte";
    
    export let type: Input["$$prop_def"]["type"]  ;
    export let placeholder: Input["$$prop_def"]["placeholder"] = "";
    export let value: Input["$$prop_def"]["value"];
    export let name: string;
    export let label: string;
    export let error: string | undefined = undefined;


    let id = name + Math.random().toString(36).substring(7);


</script>


<Label for={id} >
    <span class="mb-2" >{label}</span>
    <Input {id} {type} bind:value {placeholder} {name} size="sm">
        <slot name="left" slot="left" />
    </Input>
    {#if error}
        <Helper class='mt-2' color='red'><span class="font-medium">{error}</Helper> 
    {/if}
</Label>