<template>
	<div style="padding: 0 25%; margin: 0 auto; border: 1px solid gray" class="song-content">
		<template v-for="i in 4">
			{{ dynamicLen(songzh[`song_${i}`]) }} | {{ dynamicCount(songzh[`song_${i}`], fz) }} |
			{{ ceil(dynamicLen(songzh[`song_${i}`]) / (dynamicCount(songzh[`song_${i}`], fz) - 0.5)) }}
			<el-card>
				<div style="position: relative">
					<span style="position: absolute; bottom: 0; right: 0">1</span>
					<template v-for="ss in chunk(songzh[`song_${i}`], dynamicCount(songzh[`song_${i}`], fz))">
						<div style="display: inline-flex; flex-direction: column">
							<template v-for="s in ss">
								<div
									class="song-border"
									:style="{
										width: iw(i) + 'px',
										height: ih + 'px'
									}"
								>
									<el-tag
										class="song-item"
										disable-transitions
										type="info"
										:style="{
											fontSize: s.row == 2 ? '0.53rem' : '0.875rem'
										}"
									>
										{{ s.song }}
									</el-tag>
								</div>
							</template>
						</div>
					</template>
				</div>
			</el-card>
		</template>
		<template v-for="i in [5, 'other', 'spec', 'eng']">
			<el-card>
				{{ dynamicLen(songzh[`song_${i}`]) }} | {{ dynamicCount(songzh[`song_${i}`], fz) }}
				<template v-for="s in songzh[`song_${i}`]">
					<el-tag class="song-item" disable-transitions type="info">
						{{ s.song }}
					</el-tag>
				</template>
			</el-card>
		</template>
	</div>
</template>

<script setup lang="ts">
import type { Song, SongList } from './type'
import { floor, ceil, uniqBy, min, groupBy, chunk } from 'lodash-es'
import { useWindowSize } from '@vueuse/core'
type Songs = {
	[key: string]: Song[]
}
const props = withDefaults(defineProps<SongList>(), {
	songs: () => [] as Song[],
	specSongs: () => []
})
const fz = ref(16)
// 单个高（px）
const ih = ref(36.09)
const tih = ref(16.09)
const more = 9
// 最终组装
let songzh: Songs = {}
let gsong: Songs = {}
let singers: string[] = []
const convLen = (c: string) => {
	let l = c.length // 默认长度
	const matchr = c.match(/[a-z]/g) // 匹配小写长度
	// 默认 - 小写长 + 小写长/2
	matchr && (l = c.length - matchr!.length + ceil(matchr!.length / 2))
	return l
}
// 歌名小于5的部分
// 父容器宽，默认取视口宽
const biuldRow = (arr: Song[]) => arr.map((a) => ({ ...a, row: convLen(a.song) > more ? 2 : 1 }))
const iw = (clen: number) => ((32 + 14.53 * min([clen < 4 ? 3.5 : clen, 12])!)! / 16) * fz.value
const dynamicLen = (arr = [] as Song[]) =>
	floor((arr.filter((a: Song) => convLen(a.song) > more).length * tih.value) / ih.value) + arr.length
const dynamicCount = (arr = [] as Song[], len: number) => ceil(dynamicLen(arr) / floor(wwidth.value / iw(len)))
watch(
	() => [props.songs, props.specSongs],
	([n, s], _) => {
		if (n.length) {
			const eng = n.filter((s) => s.type.includes(1))
			const zh = n.filter((s) => s.type.includes(0))
			const isongzh: Songs = {}
			// 最终组装
			isongzh.song_other = biuldRow(
				uniqBy(zh, 'song')
					.filter((c) => convLen(c.song) > 5)
					.sort((a, b) => a.song.localeCompare(b.song, 'pinyin'))
			)
			isongzh.song_eng = biuldRow(uniqBy(eng, 'song').sort((a, b) => a.song.localeCompare(b.song)))
			for (let i = 1; i <= 5; i++)
				isongzh[`song_${i}`] = biuldRow(
					uniqBy(zh, 'song')
						.filter((c) => convLen(c.song) === i)
						.sort((a, b) => a.song.localeCompare(b.song, 'pinyin'))
				)
			if (s.length) {
				const ispec = uniqBy(s, 'song').sort((a, b) => a.song.localeCompare(b.song))
				isongzh.song_spec = biuldRow(ispec)
			}
			const igsong = groupBy(n, (s) => s.singer)
			songzh = isongzh
			gsong = igsong
			const isingers = [
				...Object.keys(igsong)
					.filter((k) => !!k)
					.sort((a, b) => a.localeCompare(b, 'pinyin', { sensitivity: 'accent' })),
				''
			]
			singers = isingers
		}
	},
	{
		immediate: true,
		deep: true
	}
)
const wwidth = ref(window.innerWidth)
const { width } = useWindowSize()
const resize = () => {
	const xdom: HTMLDivElement = document.getElementsByClassName('song-main')[0] as HTMLDivElement
	xdom && (wwidth.value = xdom.offsetWidth)
}
watch(() => width.value, resize)
onMounted(() => {
	resize()
	fz.value = +getComputedStyle(document.documentElement).getPropertyValue('font-size').replace('px', '')
	ih.value = (ih.value / 16) * fz.value
	tih.value = (tih.value / 16) * fz.value
})
</script>

<style lang="scss" scoped>
@media screen and (orientation: landscape) {
	.song-content {
		padding: 0 25%;
		margin: 0 auto;
	}
	:deep(.el-card__body) {
		padding: 0.9375rem;
	}
}
@media screen and (orientation: portrait) {
	.song-content {
		padding: 0.9375rem;
		margin: 0 auto;
	}
}
.song-item {
	min-width: 4.5rem;
	margin: 0.3125rem 0.5rem 0.3125rem 0;
	white-space: break-spaces;
	line-height: unset;
	min-height: 1.5rem;
	padding: 0.25rem 0.5625rem;
	height: unset;
}
</style>
