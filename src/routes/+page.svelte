<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import mediaRecorder, { data } from '$lib/mediaRecorder';
	let chunks = [] as BlobPart[];

	const startRecording = async () => {
		const stream = await navigator.mediaDevices.getDisplayMedia({
			video: true,
			audio: true
		});

		mediaRecorder.set(new MediaRecorder(stream));

		if (!$mediaRecorder) return false;

		$mediaRecorder.ondataavailable = (e) => {
			chunks.push(e.data);
		};

		$mediaRecorder.onstop = (e) => {
			data.set(new Blob(chunks, { type: 'video/webm' }));
			chunks = [];
			goto('/share');
		};

		$mediaRecorder.start();
	};
</script>

<div class="min-h-screen flex items-center justify-center flex-col">
	<h1 class="text-3xl font-black">screen-recorder</h1>
	<p>Easy to use screen recorder for the web with sharing capabilities.</p>

	<div class="mt-5">
		{#if browser && $mediaRecorder?.state == 'recording'}
			<button
				class="btn"
				on:click={() => {
					$mediaRecorder?.stop();
					$mediaRecorder?.stream.getTracks().forEach((track) => track.stop());
				}}
			>
				<div class="w-4 h-4 block bg-red-500" />
				Stop recording
			</button>
		{:else}
			<button class="btn" on:click={startRecording}>
				<div class="w-4 h-4 rounded-full block bg-red-500" />
				Start recording
			</button>
		{/if}
	</div>
</div>
