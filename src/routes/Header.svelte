<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: console.log(data);
</script>

<header class="hero">
	<nav class="container-fluid">
		<ul>
			<li><a href="/"><strong>Brand</strong></a></li>
		</ul>
		<ul>
			<li><a href="/about">About</a></li>
			{#if data.user}
				<li><a href="/protectedroute">Protected</a></li>
				{#if data.user.role === 'ADMIN'}
					<li><a href="/admin">Admin</a></li>
				{/if}
				<li>
					<form action="/logout" method="POST">
						<button class="btn">Logout</button>
					</form>
				</li>
				<li><span>{data.user.name}</span></li>
			{:else}
				<li><a href="/register">Register</a></li>
				<li><a href="/login">Login</a></li>
			{/if}
		</ul>
	</nav>
</header>

<style>
	form {
		margin-bottom: 0;
	}
	span {
		color: white;
	}
	.btn {
		border: none;
		padding: 0;
		/* margin: 0 0.2em; */
		background: none;
		color: var(--primary);
	}
	.btn:hover {
		color: var(--primary-hover);
	}
</style>
