import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import VitePluginSvgSpritemap from "@spiriit/vite-plugin-svg-spritemap";

// https://vite.dev/config/
export default defineConfig({
	server: {
		port: 8080,
	},
	plugins: [
		vue(),
		VitePluginSvgSpritemap('./src/assets/icons/**/*.svg', {
			prefix: 'icon-',
			output: {
				filename: '../img/icons.svg',
			},
			injectSvgOnDev: true,
		})
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		},
	},
})
