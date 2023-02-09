<script lang="ts">
	import { enhance } from '$app/forms'; // prevent form reload
	import type { PageData } from './$types';

	export let data: PageData;

	$: console.log('Protected route, data:', data);

	let text = '';
</script>

<div class="container">
	<h1>A Protected Route</h1>
	<h2>User {data?.user?.name}</h2>
	<p>Role: {data?.user?.role}</p>
	<div>
		<form method="POST" use:enhance>
			<textarea rows="10" name="text" bind:value={text} />
			<button>Go!</button>
		</form>
	</div>
</div>
