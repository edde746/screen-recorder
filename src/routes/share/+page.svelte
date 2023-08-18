<script lang="ts">
	import { onMount } from 'svelte';
	import mediaRecorder, { data } from '$lib/mediaRecorder';
	import { goto } from '$app/navigation';
	import { Download, Link } from 'lucide-svelte';
	import { addToast } from '$lib/toasts';

	onMount(() => {
		if ($data.size == 0) goto('/');
	});

	$: url = URL.createObjectURL($data);

	const shareVideo = () => {
		const formData = new FormData();
		formData.append('file', $data);
		fetch('/upload', {
			method: 'POST',
			body: formData
		}).then((res) => {
			if (res.ok) {
				res.json().then((json) => {
					navigator.clipboard.writeText(json.url);
					addToast('Copied link to clipboard.', 'alert-success');
				});
			} else {
				addToast('Something went wrong.', 'alert-error');
			}
		});
	};
</script>

<div class="min-h-screen flex items-center justify-center flex-col">
	<h1 class="text-3xl font-black">screen-recorder</h1>
	<p>Share or download your recording.</p>

	<div class="mt-5 flex gap-2">
		<a href={url} download="screen-recording.webm" class="btn btn-primary">
			<Download />
			Download
		</a>
		<!-- check filesize is below 100 mb -->
		{#if $data.size < 100000000}
			<button class="btn" on:click={shareVideo}>
				<Link />
				Share
			</button>
		{:else}
			<div class="tooltip tooltip-bottom" data-tip="Filesize is too large to share.">
				<button class="btn" disabled>
					<Link />
					Share
				</button>
			</div>
		{/if}
	</div>
</div>
