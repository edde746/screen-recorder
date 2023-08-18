import { writable } from 'svelte/store';
export default writable<MediaRecorder | null>(null);
export const data = writable<Blob>(new Blob());
