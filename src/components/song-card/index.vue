<template>
	<div class="main-container">
		<el-card class="slogan" :style="{ '--slogan': `url(${slogan})` }">
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
			<SvgIcon
				:name="avater.name || ''"
				:img="avater.img"
				:src="avater.src || ''"
				width="4.375rem"
				height="4.375rem"
				:is="avater.is || 'v-fragment'"
				:in-style="{ top: '5.5rem', position: 'absolute', 'border-radius': '.9375rem' }"
				v-bind="avater.$attr || {}"
			/>
		</el-card>
		<el-card v-for="l in Object.keys(groupedSongs).sort()" :key="l" class="category-card">
			<Item :songss="sliceSongs(groupedSongs[l])" />
		</el-card>
	</div>
</template>

<script setup lang="ts">
import { pinyin } from 'pinyin-pro'
import type { SliceSong, Song, SongList } from './type'
import Item from './item.vue'
import { convLen } from './index'
import { remove } from 'lodash-es'
const props = withDefaults(defineProps<SongList>(), {
	songs: () => [] as Song[],
	avater: () => ({}),
	categories: () => ({}),
	vip: '---',
	slogan: '',
	logo: () => ({ fontFamily: 'BEYNO', fontSize: '2.7rem', height: '5rem' }),
	logoCn: '---'
})
// 按类别分组
const groupedSongs = computed(() => {
	return props.songs.reduce((acc: Record<string, Song[]>, song) => {
		let l = convLen(song.song)
		l > 5 ? (l = 6) : l
		if (!acc[`song${l}`]) acc[`song${l}`] = []
		acc[`song${l}`].push(song)
		return acc
	}, {})
})
const sliceSongs = (songs: Song[]) => {
	const less1 = remove(songs, (s) => convLen(s.song) < 2)
	const less2 = remove(songs, (s) => convLen(s.song) < 3)
	const less3 = remove(songs, (s) => convLen(s.song) < 4)
	const less4 = remove(songs, (s) => convLen(s.song) < 5)
	const less5 = remove(songs, (s) => convLen(s.song) < 6)
	return [
		...(less1.length ? [{ columns: 5, list: sortedSongs(less1), length: less1.length }] : []),
		...(less2.length ? [{ columns: 5, list: sortedSongs(less2), length: less2.length }] : []),
		...(less3.length ? [{ columns: 5, list: sortedSongs(less3), length: less3.length }] : []),
		...(less4.length ? [{ columns: 5, list: sortedSongs(less4), length: less4.length }] : []),
		...(less5.length ? [{ columns: 6.6, list: sortedSongs(less5), length: less5.length }] : []),
		...(songs.length ? [{ columns: 9, list: sortedSongs(songs), length: songs.length }] : [])
	] as SliceSong[]
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
		padding: 0.9375rem;
	}
}
@media screen and (orientation: portrait) {
	.main-container {
		padding: 0.9375rem;
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
		.logo {
			text-shadow: 0.0625rem 0.0625rem 0.125rem black;
			color: white;
			font-size: 2.7rem;
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
}

.category-title {
	font-size: 1.125rem;
	font-weight: bold;
}
</style>
