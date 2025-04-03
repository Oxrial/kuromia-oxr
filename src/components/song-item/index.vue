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
		<el-card v-for="category in Object.keys(groupedSongs)" :key="category" class="category-card">
			<template #header>
				<div class="category-title">{{ categories[category as keyof typeof categories] }}</div>
			</template>
			<Item :songss="sliceSongs(groupedSongs[category])" />
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
	return props.songs.reduce(
		(acc: Record<string, Song[]>, song) => {
			if (song?.category && !acc[song?.category]) acc[song?.category] = []
			song?.category ? acc[song?.category].push(song) : acc.unknown.push(song)
			return acc
		},
		{ unknown: [] }
	)
})
const sliceSongs = (songs: Song[]) => {
	const less = remove(songs, (s) => convLen(s.song) < 5)
	return [
		{ columns: 7.65, list: sortedSongs(less), length: less.length },
		{ columns: 10.18, list: sortedSongs(songs), length: songs.length }
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
	margin-bottom: 1.25rem;
}

.category-title {
	font-size: 1.125rem;
	font-weight: bold;
}
</style>
