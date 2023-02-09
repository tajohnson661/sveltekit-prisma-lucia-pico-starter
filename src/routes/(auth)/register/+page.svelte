<script lang="ts">
	import { enhance } from '$app/forms';
	import Input from '$lib/components/Input.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;

	$: form ? console.log('form:', form) : console.log('no form yet');
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<div class="container">
	<h1>Register</h1>
	<p>
		<a href="/login">Already have an account or want to connect with an OAuth provider?</a>
	</p>

	{#if form?.errors?.message}
		<p>{form.errors.message}</p>
	{/if}

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
		<Input
			placeholder="Name"
			value={form?.data?.name ?? ''}
			type="text"
			id="name"
			required
			errors={form?.errors?.name}
		/>

		<button type="submit">Register</button>
	</form>
</div>
