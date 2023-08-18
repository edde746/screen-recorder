<script lang="ts">
	import '../app.postcss';

	import toasts from '$lib/toasts';
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
</script>

<div class="toast">
	{#each $toasts as toast (toast.id)}
		<div class="alert transition-none {toast.class}" out:fade={{ duration: 200 }} animate:flip>
			<span>{toast.message}</span>
		</div>
	{/each}
</div>

<slot />
