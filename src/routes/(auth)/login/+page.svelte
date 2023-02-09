<script lang="ts">
	import { enhance } from '$app/forms';
	import Input from '$lib/components/Input.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;

	$: form ? console.log('form:', form) : console.log('no form yet');
</script>

<svelte:head>
	<title>Sign in</title>
</svelte:head>

<div class="container">
	<h1>Sign In</h1>
	<p>
		<a href="/register">Need an account?</a>
	</p>

	{#if form?.errors?.message}
		<p>{form.errors.message}</p>
	{/if}

	<div>
		<a href={'/oauth/github'} data-sveltekit-preload-data="off">
			<span>Continue with Github</span>
		</a>
	</div>

	<form use:enhance method="POST">
		<Input
			placeholder="Email"
			value={form?.data?.email ?? ''}
			type="email"
			id="email"
			required
			errors={form?.errors?.email}
		/>
		<Input
			placeholder="Password"
			type="password"
			required
			id="password"
			errors={form?.errors?.password}
		/>
		<button type="submit">Sign in</button>
	</form>
</div>
