/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}',  "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",],

	darkMode: 'class',
	
	plugins: [
		require('flowbite/plugin')
	],
	theme: {
		extend: {
			colors: {
				primary: '#ffffff', //White
				secondary1: '#f2c111', //Gold
				secondary2: '#1d6ff2 ', //Blue
				accent: '#54AE9E', //Light Green
			},
		}
	},
};

module.exports = config;
