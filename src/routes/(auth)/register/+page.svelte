<script lang="ts">
    import type { PageData } from './$types';
    import { superForm } from 'sveltekit-superforms/client';
    
    export let data: PageData;



    const { form } = superForm(data.form);

</script>