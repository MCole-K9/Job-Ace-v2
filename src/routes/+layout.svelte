<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import { invalidate } from '$app/navigation'
	import { onMount } from 'svelte'
	import '$styles'
	import { user } from '$stores/user-store.js';

	export let data

	$: ({ supabase, session } = data)

	$: user.set(data.user)


	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
			}
		})

		return () => data.subscription.unsubscribe()
	})
</script>



<slot />
