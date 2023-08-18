<script lang="ts">
	import { Download } from 'lucide-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<p>
	This video was uploaded at {data.date?.toLocaleString('en-GB', {
		timeStyle: 'short',
		dateStyle: 'short'
	})}.
</p>

<!-- svelte-ignore a11y-media-has-caption -->
<div class="mt-5">
	<video src={data.url} controls class="w-full rounded-md max-w-xl" />
	<div class="mt-5 flex justify-center">
		<a href={data.url} download="screen-recording.webm" class="btn btn-primary">
			<Download />
			Download
		</a>
	</div>
</div>
