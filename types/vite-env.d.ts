/// <reference types="vite/client" />
/// <reference types="vidstack/vue" />
/// <reference types="chrome"/>
/// <reference types="vite-svg-loader" />
/// <reference types="unplugin-fonts/client" />
interface ImportMetaEnv {
	readonly VITE_APP_TITLE: string
	// 更多环境变量...
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
