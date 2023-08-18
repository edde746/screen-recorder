<script lang="ts">
	import '../app.postcss';

	import toasts from '$lib/toasts';
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
</script>

<svelte:head>
	<title>screen-recorder</title>
	<meta
		name="description"
		content="Easy to use screen recorder for the web with sharing capabilities."
	/>
</svelte:head>

<div class="toast">
	{#each $toasts as toast (toast.id)}
		<div class="alert transition-none {toast.class}" out:fade={{ duration: 200 }} animate:flip>
			<span>{toast.message}</span>
		</div>
	{/each}
</div>

<div class="min-h-screen flex items-center justify-center flex-col">
	<h1 class="text-3xl font-black">screen-recorder</h1>

	<slot />
</div>
