<script lang="ts">
	export let value = '';
	export let placeholder = '';
	export let id: string;
	export let label = '';
	export let type = 'text';
	export let disabled = false;
	export let required = false;
	export let errors: string[];
</script>

<div>
	<label for={id}>
		<span>{label}</span>
	</label>
	<input
		class="form-control form-control-lg"
		{type}
		{placeholder}
		{required}
		{disabled}
		{id}
		name={id}
		{value}
	/>
	{#if errors}
		{#each errors as error}
			<label for={id}>
				<span class="red"><small>{error}</small></span>
			</label>
		{/each}
	{/if}
</div>

<style>
	.red {
		color: red;
	}
</style>
