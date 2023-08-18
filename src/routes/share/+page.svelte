<script lang="ts">
	import { onMount } from 'svelte';
	import mediaRecorder, { data } from '$lib/mediaRecorder';
	import { goto } from '$app/navigation';
	import { Download, Link, Loader2 } from 'lucide-svelte';
	import { addToast } from '$lib/toasts';

	onMount(() => {
		if ($data.size == 0) goto('/');
	});

	$: url = URL.createObjectURL($data);

	let uploading = false;
	const shareVideo = () => {
		if (uploading) return;
		uploading = true;
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
					goto(`/video/${json.id}`);
				});
			} else {
				if (res.headers.get('content-type')?.includes('application/json'))
					res.json().then((json) => {
						addToast(json.error, 'alert-error');
					});
				else addToast('Something went wrong.', 'alert-error');
			}
			uploading = false;
		});
	};
</script>

<p>Share or download your recording.</p>

<!-- svelte-ignore a11y-media-has-caption -->
<video src={url} controls class="w-full rounded-md max-w-xl mt-5" />

<div class="mt-5 flex gap-2">
	<a href={url} download="screen-recording.webm" class="btn btn-primary">
		<Download />
		Download
	</a>
	<!-- check filesize is below 100 mb -->
	{#if $data.size < 100000000}
		<button class="btn" on:click={shareVideo}>
			{#if uploading}
				<div class="animate-spin">
					<Loader2 />
				</div>
				Uploading...
			{:else}
				<Link />
				Share
			{/if}
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
