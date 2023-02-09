<script lang="ts">
	import '@picocss/pico';
	import '../app.css';

	import Header from './Header.svelte';
	import Footer from './Footer.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<Header {data} />
<main class="main">
	<slot />
</main>
<Footer />

<style>
	.main {
		flex-grow: 1;
	}
</style>
