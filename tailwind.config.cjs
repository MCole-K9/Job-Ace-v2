/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}',  "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",],

	darkMode: 'class',
	
	plugins: [
		require('flowbite/plugin')
	],
	theme: {
		extend: {}
	},
};

module.exports = config;
