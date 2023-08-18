import { writable } from 'svelte/store';

type Toast = {
	id: number;
	message: string;
	class: string;
};

const toasts = writable<Toast[]>([]);
export default toasts;

export const addToast = (message: string, className: string) => {
	const id = Math.floor(Math.random() * 1000000);
	toasts.update((current) => [...current, { message, class: className, id }]);
	setTimeout(() => {
		toasts.update((current) => current.filter((t) => t.id !== id));
	}, 3000);
};
