<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<div class="container">
	<h1>About Page</h1>
	<p>{data.message}</p>
</div>
