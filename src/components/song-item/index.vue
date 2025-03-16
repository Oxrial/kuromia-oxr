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
		<el-card
			v-for="category in Object.keys(sortedSongs)"
			:key="category"
			class="category-card"
			:ref="(ref) => setCategoryRef(ref, category)"
		>
			<template #header>
				<div class="category-title">{{ categories[category as keyof typeof categories] }}</div>
			</template>
			<div class="song-columns-container">
				<el-badge
					v-for="item in sortedSongs[category]"
					:hidden="!item.tag || (item.tag && item.tag !== 3) as boolean"
					:value="item.tag ? TAG_ENUMS[item.tag].label : ''"
					:color="(item.tag && TAG_ENUMS[item.tag].color) + '22' || '#a2d3ff'"
					:badge-style="{
						color: (item.tag && TAG_ENUMS[item.tag].color) || '#a2d3ff',
						fontSize: '.6rem',
						borderWidth: 0,
						padding: '.125rem .375rem'
					}"
					:offset="[-16, 5]"
					class="song-item"
					:class="{ 'long-text': convLen(item.song) >= 9 }"
				>
					<!-- :color="
									(theme
										? theme
										: color[dynamicColor3(index, songzh[`song_${k}`], more)] || '#a2d3ff') + '11'
								"
								:style="{
									'border-left': `.3125rem ${
										(theme
											? theme
											: color[dynamicColor3(index, songzh[`song_${k}`], more)] || '#a2d3ff') +
										'44'
									} solid`,
								}" -->
					<el-tag disable-transitions type="info" @click="copySong(item)">
						{{ item.song }}
					</el-tag>
				</el-badge>
			</div>

			<el-space class="song-columns-container" wrap alignment="start" direction="vertical"> </el-space>
		</el-card>
	</div>
</template>

<script setup lang="ts">
import { pinyin } from 'pinyin-pro'
import type { Song, SongList } from './type'
import { useClipboard } from '@vueuse/core'
import { ceil } from 'lodash-es'
const props = withDefaults(defineProps<SongList>(), {
	songs: () => [] as Song[],
	avater: () => ({}),
	categories: () => ({}),
	vip: '---',
	slogan: '',
	logo: () => ({ fontFamily: 'BEYNO', fontSize: '2.7rem', height: '5rem' }),
	logoCn: '---'
})
const TAG_ENUMS: { [key: number]: { label: string; color: string } } = {
	3: { label: 'NEW', color: '#58c147' },
	1: { label: 'SC', color: '#ff9a8b' },
	2: { label: '舰长', color: '#66bbf9' }
}
const convLen = (c: string) => {
	let l = c.length // 默认长度
	const matchr = c.match(/[a-z]/g) // 匹配小写长度
	// 默认 - 小写长 + 小写长/2
	matchr && (l = c.length - matchr!.length + ceil(matchr!.length / 2))
	return l
}
const source = ref('---')
const { copy, isSupported } = useClipboard({ source })
const copySong = (v: Song) => {
	if (isSupported) {
		copy(`点歌 ${v.song}`)
		ElMessage({
			message: `点歌 ${v.song}`,
			grouping: true,
			type: 'success',
			duration: 5000,
			plain: true,
			offset: 200,
			showClose: true
		})
	}
}
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

// 按拼音排序
const sortedSongs = computed(() => {
	const result: Record<string, Song[]> = {}
	Object.keys(groupedSongs.value).forEach((category) => {
		result[category] = [...groupedSongs.value[category]].sort((a, b) => {
			return pinyin(a.song, { toneType: 'none' }).localeCompare(pinyin(b.song, { toneType: 'none' }))
		})
	})
	return result
})

let categoryRefs: { [key: string]: any } = {}
const setCategoryRef = (el: any, category: string) => {
	if (el) {
		categoryRefs[category] = el
	}
}
onMounted(() => {
	console.log(categoryRefs)
	// 	const grid = Array.from(document.querySelector("#grid").children);
	// const baseOffset = grid[0].offsetTop;
	// const breakIndex = grid.findIndex(item => item.offsetTop > baseOffset);
	// const numPerRow = (breakIndex === -1 ? grid.length : breakIndex);
})
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

.song-columns-container {
	columns: 11.25rem auto;
	column-gap: 20px;
}
.el-tag {
	min-width: 4.5rem;
	width: inherit;
	margin-bottom: 0.75rem;
	line-height: 1.4;
	padding: 0.25rem 0.5625rem;
	height: unset;
	white-space: break-spaces;
	justify-content: unset;
}
.song-item,
.song-columns-container :deep(.el-space__item) {
	break-inside: avoid; /* 防止元素跨列分割 */
	transition: all 0.3s;
	width: 100%;
	.el-tag {
		font-size: 1.05rem;
	}
}

.song-item.long-text {
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	.el-tag {
		font-size: 1rem;
	}
}
</style>
