import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import svgLoader from 'vite-svg-loader'
import VueJsx from '@vitejs/plugin-vue-jsx'
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd())
	return {
		base: env.VITE_PUBLIC_PATH,
		server: {
			port: 3000
			// host: '0.0.0.0',
			// proxy: {
			//     // 代理拦截匹配前缀
			//     '/api': {
			//         target: 'http://127.0.0.1:3001',
			//         changeOrigin: true,
			//         rewrite: path => path.replace(/^\/api/, '/api/v1')
			//     }
			// }
		},
		resolve: {
			alias: {
				'@': resolve(__dirname, './src')
			}
		},
		plugins: [
			vue(),
			VueJsx(),
			svgLoader({ defaultImport: 'url' }),
			AutoImport({
				include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
				imports: ['vue', 'vue-router'],
				// eslintrc: {
				//     enabled: false,
				//     filepath: 'types/.eslintrc-auto-import.json',
				//     globalsPropValue: true
				// },
				dts: 'types/auto-imports.d.ts',
				resolvers: [ElementPlusResolver()]
			}),
			Components({
				resolvers: [
					ElementPlusResolver({
						importStyle: false
					})
				],
				dts: 'types/components.d.ts'
			}),
			createSvgIconsPlugin({
				iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
				symbolId: 'icon-[dir]-[name]'
			})
		],
		build: {
			outDir: 'docsi',
			/** 单个 chunk 文件的大小超过 2048KB 时发出警告 */
			chunkSizeWarningLimit: 2048,
			/** 禁用 gzip 压缩大小报告 */
			reportCompressedSize: false,
			/** 打包后静态资源目录 */
			assetsDir: 'static',
			rollupOptions: {
				output: {
					manualChunks: {
						vue: ['vue', 'vue-router', 'pinia'],
						element: ['element-plus', '@element-plus/icons-vue']
					}
				}
			}
		},
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@import "@/assets/style/bem.scss";`
				}
			}
		}
	}
})