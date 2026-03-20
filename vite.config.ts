import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	define: {
		"process.env": {},
	},
	plugins: [tailwindcss(), sveltekit()]
});