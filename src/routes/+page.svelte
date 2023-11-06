<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import mediaRecorder, { data } from '$lib/mediaRecorder';
	import fixWebmDuration from 'webm-duration-fix';
	let chunks = [] as BlobPart[];
	let captureAudio = true;

	const startRecording = async () => {
		const stream = await navigator.mediaDevices.getDisplayMedia({
			video: true,
			audio: captureAudio
		});

		mediaRecorder.set(new MediaRecorder(stream));

		if (!$mediaRecorder) return false;

		$mediaRecorder.ondataavailable = (e) => {
			chunks.push(e.data);
		};

		$mediaRecorder.onstop = async (e) => {
			const blob = new Blob(chunks, { type: 'video/webm' });

			data.set(await fixWebmDuration(blob));
			chunks = [];
			goto('/share');
		};

		$mediaRecorder.start();
	};
</script>

<p class="text-center">Easy to use screen recorder for the web with sharing capabilities.</p>

<div class="mt-5">
	{#if browser && $mediaRecorder?.state == 'recording'}
		<button
			class="btn"
			on:click={() => {
				$mediaRecorder?.stop();
				$mediaRecorder?.stream.getTracks().forEach((track) => track.stop());
			}}
		>
			<div class="w-4 h-4 block bg-red-500 rounded-sm" />
			Stop recording
		</button>
	{:else}
		<button class="btn" on:click={startRecording}>
			<div class="w-4 h-4 rounded-full block bg-red-500" />
			Start recording
		</button>
		<div class="form-control mt-1">
			<label class="label cursor-pointer">
				<span class="label-text">Capture audio</span>
				<input type="checkbox" class="toggle" bind:checked={captureAudio} />
			</label>
		</div>
	{/if}
</div>
