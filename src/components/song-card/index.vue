<template>
	<div ref="contentRef" class="main-container">
		<el-card v-if="logo && !pnglogo" class="slogan" :style="{ '--slogan': `url(${slogan})` }">
			<div style="min-height: 10rem">
				<div
					class="logo"
					:style="{
						'font-family': logo.fontFamily,
						'font-size': logo.fontSize,
						height: logo.height
					}"
				>
					{{ vup }}
				</div>
				<div style="position: absolute; right: 5%; bottom: 10%">
					<div class="logo-cn">{{ logoCn }}</div>
					<div
						style="
							text-align: right;
							font-size: 0.875rem;
							text-shadow: 0.0625rem 0.0625rem 0.125rem black;
							color: white;
						"
					>
						注：若页面异常请看图片版本
					</div>
				</div>
				<SvgIcon
					:name="avater.name || ''"
					:img="avater.img"
					:src="avater.src || ''"
					width="4.375rem"
					height="4.375rem"
					:is="avater.is || 'v-fragment'"
					:in-style="{
						top: '5.5rem',
						position: 'absolute',
						'border-radius': '.9375rem',
						'margin-left': '5%'
					}"
					v-bind="avater.$attr || {}"
				/>
			</div>
		</el-card>
		<el-card v-else class="slogan" :style="{ '--slogan': `url(${slogan})` }">
			<div class="logo-main" :style="{ '--logo': `url(${pnglogo})` }">
				<el-row>
					<el-col :span="6">
						<div>
							<SvgIcon
								:name="avater.name || ''"
								:img="avater.img"
								:src="avater.src || ''"
								width="4.375rem"
								height="4.375rem"
								:is="avater.is || 'v-fragment'"
								:in-style="{
									top: '8.5rem',
									position: 'absolute',
									'border-radius': '.9375rem'
								}"
								v-bind="avater.$attr || {}"
							/>
						</div>
					</el-col>
					<el-col :span="18"> </el-col>
				</el-row>
			</div>
			<div>
				<div class="logo-cn">{{ logoCn }}</div>
				<div
					style="
						text-align: right;
						font-size: 0.875rem;
						text-shadow: 0.0625rem 0.0625rem 0.125rem black;
						color: white;
					"
				>
					注：若页面异常请看图片版本
				</div>
			</div>
		</el-card>
		<template v-for="lk in Object.keys(groupedSongs)">
			<template v-for="(lenSong, _, index) in lenSongs(groupedSongs[lk].flatMap((s) => s.list))">
				<el-card class="category-card" v-if="lenSong[0]?.list.length">
					<template v-if="index === 0 && icates.find((c) => c.code === lk)" #header>
						<span :style="{ color: color[0] }"
							>{{ icates.find((c) => c.code === lk)?.label }}
						</span></template
					>
					<Item :songss="lenSong" :width="width" :theme="theme" :color="color" />
				</el-card>
			</template>
		</template>
	</div>
</template>

<script setup lang="ts">
import { pinyin } from 'pinyin-pro'
import type { SliceSong, Song, SongProp } from './type'
import Item from './item.vue'
import { convLen } from './index'
import { remove, uniqBy } from 'lodash-es'
import { useElementSize } from '@vueuse/core'
const props = withDefaults(defineProps<SongProp>(), {
	songs: () => [] as Song[],
	avater: () => ({}),
	vup: '---',
	slogan: '',
	logo: () => ({ fontFamily: 'BEYNO', fontSize: '2.7rem', height: '5rem' }),
	logoCn: '---',
	theme: '',
	color: () => ['#66bbf9', '#d69dff', '#ff9a8b', '#d1ac3c', '#58c147'],
	cates: () => []
})
const contentRef = useTemplateRef<HTMLElement>('contentRef')
const { width } = useElementSize(contentRef)

// 按类别分组
const groupedSongs = computed(() => {
	return sliceSongs(uniqBy(props.songs, 'song'))
})
const icates = [...props.cates]
const cateList = (list: Song[]) => [
	...(list.length ? [{ columns: 9.2, list: sortedSongs(list), length: list.length }] : [])
]
const sliceSongs = (songs: Song[]) => {
	const res = {} as { [key: string]: SliceSong[] }
	icates.forEach((c) => {
		res[c.code] = cateList(remove(songs, (s) => s.type.includes(c.value)))
	})
	// const eng = remove(songs, (s) => s.type.includes(1))
	// const oth = remove(songs, (s) => s.type.includes(6))
	// const less1 = remove(songs, (s) => convLen(s.song) < 2)
	// const less2 = remove(songs, (s) => convLen(s.song) < 3)
	// const less3 = remove(songs, (s) => convLen(s.song) < 4)
	// const less4 = remove(songs, (s) => convLen(s.song) < 5)
	// const less5 = remove(songs, (s) => convLen(s.song) < 6)
	// const less6 = remove(songs, (s) => convLen(s.song) < 7)
	return {
		// song1: [...(less1.length ? [{ columns: 4, list: sortedSongs(less1), length: less1.length }] : [])],
		// song2: [...(less2.length ? [{ columns: 4, list: sortedSongs(less2), length: less2.length }] : [])],
		// song3: [...(less3.length ? [{ columns: 4, list: sortedSongs(less3), length: less3.length }] : [])],
		// song4: [...(less4.length ? [{ columns: 6, list: sortedSongs(less4), length: less4.length }] : [])],
		// song5: [...(less5.length ? [{ columns: 6, list: sortedSongs(less5), length: less5.length }] : [])],
		// song6: [...(less6.length ? [{ columns: 9.2, list: sortedSongs(less6), length: less6.length }] : [])],
		...res,
		song_oth: [...(songs.length ? [{ columns: 9.2, list: sortedSongs(songs) }] : [])]
	} as { [key: string]: SliceSong[] }
}
const lenSongs = (songs: Song[]) => {
	const eng = remove(songs, (s) => s.type.includes(1))
	const oth = remove(songs, (s) => s.type.includes(6))
	const less1 = remove(songs, (s) => convLen(s.song) < 2)
	const less2 = remove(songs, (s) => convLen(s.song) < 3)
	const less3 = remove(songs, (s) => convLen(s.song) < 4)
	const less4 = remove(songs, (s) => convLen(s.song) < 5)
	const less5 = remove(songs, (s) => convLen(s.song) < 6)
	const less6 = remove(songs, (s) => convLen(s.song) < 7)
	return {
		...(less1.length && { song1: [{ columns: 4, list: sortedSongs(less1) }] }),
		...(less2.length && { song2: [{ columns: 4, list: sortedSongs(less2) }] }),
		...(less3.length && { song3: [{ columns: 4, list: sortedSongs(less3) }] }),
		...(less4.length && { song4: [{ columns: 6, list: sortedSongs(less4) }] }),
		...(less5.length && { song5: [{ columns: 6, list: sortedSongs(less5) }] }),
		...(less6.length && { song6: [{ columns: 9.2, list: sortedSongs(less6) }] }),
		...(eng.length && { eng: [{ columns: 9.2, list: sortedSongs(eng) }] }),
		...(oth.length && { oth: [{ columns: 9.2, list: sortedSongs(oth) }] }),
		...(songs.length && { rest: [{ columns: 9.2, list: sortedSongs(songs) }] })
		// song1: [...(less1.length ? [{ columns: 4, list: sortedSongs(less1), length: less1.length }] : [])],
		// song2: [...(less2.length ? [{ columns: 4, list: sortedSongs(less2), length: less2.length }] : [])],
		// song3: [...(less3.length ? [{ columns: 4, list: sortedSongs(less3), length: less3.length }] : [])],
		// song4: [...(less4.length ? [{ columns: 6, list: sortedSongs(less4), length: less4.length }] : [])],
		// song5: [...(less5.length ? [{ columns: 6, list: sortedSongs(less5), length: less5.length }] : [])],
		// song6: [...(less6.length ? [{ columns: 9.2, list: sortedSongs(less6), length: less6.length }] : [])],
		// eng: [...(eng.length ? [{ columns: 9.2, list: sortedSongs(eng), length: eng.length }] : [])],
		// oth: [...(oth.length ? [{ columns: 9.2, list: sortedSongs(oth), length: oth.length }] : [])],
		// song7: [...(songs.length ? [{ columns: 9.2, list: sortedSongs(songs), length: songs.length }] : [])]
	} as { [key: string]: SliceSong[] }
}
// 按拼音排序
const sortedSongs = (songs: Song[]) => {
	return songs.sort((a, b) => {
		return pinyin(a.song, { toneType: 'none' }).localeCompare(pinyin(b.song, { toneType: 'none' }))
	})
}
</script>

<style lang="scss" scoped>
@media screen and (orientation: landscape) {
	.main-container {
		padding: 0 25%;
		margin: 0 auto;
	}
	:deep(.el-card__body) {
		padding: 0.75rem;
	}
}
@media screen and (orientation: portrait) {
	.main-container {
		padding: 0.75rem;
		margin: 0 auto;
	}
}
.main-container {
	background-size: 3.5356rem 3.5356rem;
	.slogan {
		margin: 0 auto;
		background-repeat: no-repeat;
		background-size: cover;
		position: relative;
		.logo-main {
			height: 10rem;
			background: var(--logo) 50%;
			background-size: contain;
			background-repeat: no-repeat;
			.el-row {
				height: 100%;
			}
		}
		.logo {
			text-shadow: 0.0625rem 0.0625rem 0.125rem black;
			color: white;
			font-size: 2.5rem;
			text-align: center;
			font-weight: bolder;
			font-family: BEYNO;
			height: 5rem;
			line-height: 5rem;
		}
		.logo-cn {
			text-shadow: 0.1875rem 0.1875rem 0.125rem black;
			color: #fff;
			font-size: 1.8rem;
			text-align: right;
			font-family: FangSong;
		}
	}
}
.slogan {
	background: var(--slogan);
}

.category-card {
	margin-top: 1.25rem;
	border-radius: 1.25rem;
	:deep(.el-card__body) {
		padding: 20px 10px 0 10px;
	}
	:deep(.el-card__header) {
		padding: 10px 20px;
		font-style: italic;
	}
}

.category-title {
	font-size: 1.125rem;
	font-weight: bold;
}
</style>
