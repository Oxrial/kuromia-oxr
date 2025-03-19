<template>
	<div class="song-content">
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
		<el-tabs v-if="tab" v-model="itype" class="song-tabs">
			<el-tab-pane label="按歌名" name="song"> </el-tab-pane>
			<el-tab-pane label="按歌手" name="singer">
				<template v-for="singer in singers">
					<div wrap class="singer-item" v-if="gsong[singer]">
						<span class="singer">{{ singer }}:&emsp;</span>
						<el-tag
							class="song-item"
							disable-transitions
							v-for="song in gsong[singer].sort((a, b) =>
								a.song.localeCompare(b.song, 'pinyin', { sensitivity: 'accent' })
							)"
							@click="copySong(song)"
						>
							{{ song.song }}
						</el-tag>
					</div>
				</template>
			</el-tab-pane>
		</el-tabs>
		<div v-else id="default-song"></div>
		<Teleport :to="tab ? '#pane-song' : '#default-song'" defer>
			<template v-for="i in 5">
				<el-card class="song-list">
					<el-space
						class="song-main"
						wrap
						alignment="start"
						direction="vertical"
						:size="[0, 0]"
						:style="{
							// 总个数/行可放个数=纵列可放个数向上取整 => 计算高度
							height: ceil((dynamicCount3(songzh[`song_${i}`], i) * ih) / fz) + 'rem'
						}"
					>
						<template v-for="(item, index) in songzh[`song_${i}`]">
							<div
								class="song-border"
								:style="{
									width: iw(i) + 'px',
									height: ih + 'px'
								}"
							>
								<el-badge
									:hidden="!item.tag || (item.tag && item.tag !== 3) as boolean"
									:value="item.tag ? TAG_ENUMS[item.tag].label : ''"
									:color="(item.tag && TAG_ENUMS[item.tag].color) + '22' || '#a2d3ff'"
									:badge-style="{
										color: (item.tag && TAG_ENUMS[item.tag].color) || '#a2d3ff',
										fontSize: '.5625rem',
										borderWidth: 0
									}"
									:offset="[-16, 5]"
								>
									<el-tag
										class="song-item"
										disable-transitions
										type="info"
										:color="
											(theme
												? theme
												: color[dynamicColor3(index, songzh[`song_${i}`], i)] || '#a2d3ff') +
											'11'
										"
										@click="copySong(item)"
										:style="{
											'border-left': `.3125rem ${
												// 按列序取颜色
												(theme
													? theme
													: color[dynamicColor3(index, songzh[`song_${i}`], i)] ||
													  '#a2d3ff') + '44'
											} solid`,
											color: theme
												? theme
												: color[dynamicColor3(index, songzh[`song_${i}`], i)] || '#a2d3ff',
											fontSize: item.row == 2 ? '0.53rem' : '0.875rem'
										}"
									>
										{{ item.song }}
									</el-tag>
								</el-badge>
							</div>
						</template>
					</el-space>
				</el-card>
			</template>
			<template v-for="k in ['other', 'spec', 'eng']">
				<el-card class="song-list" v-if="songzh[`song_${k}`]">
					<el-space
						class="song-main"
						wrap
						alignment="start"
						direction="vertical"
						:size="[0, 0]"
						:style="{
							height: (dynamicCount3(songzh[`song_${k}`], more) * ih) / fz + 'rem'
						}"
					>
						<template v-for="(item, index) in songzh[`song_${k}`]">
							<div
								class="song-border"
								:style="{
									width: iw(more) + 'px',
									height: ih + 'px'
								}"
							>
								<el-badge
									:hidden="!item.tag || (item.tag && item.tag !== 3) as boolean"
									:value="item.tag ? TAG_ENUMS[item.tag].label : ''"
									:color="(item.tag && TAG_ENUMS[item.tag].color) + '22' || '#a2d3ff'"
									:badge-style="{
										color: (item.tag && TAG_ENUMS[item.tag].color) || '#a2d3ff',
										fontSize: '.5625rem',
										borderWidth: 0
									}"
									:offset="[-16, 5]"
								>
									<el-tag
										class="song-item"
										disable-transitions
										type="info"
										:color="
											(theme
												? theme
												: color[dynamicColor3(index, songzh[`song_${k}`], more)] || '#a2d3ff') +
											'11'
										"
										:style="{
											'border-left': `.3125rem ${
												(theme
													? theme
													: color[dynamicColor3(index, songzh[`song_${k}`], more)] ||
													  '#a2d3ff') + '44'
											} solid`,
											// 设单个歌名最大长度为more个汉字
											'max-width': iw(more) / fz + 'rem',
											color: theme
												? theme
												: color[dynamicColor3(index, songzh[`song_${k}`], more)] || '#a2d3ff',
											fontSize: item.row == 2 ? '0.66rem' : '0.875rem'
										}"
										@click="copySong(item)"
									>
										{{ item.song }}
									</el-tag>
								</el-badge>
							</div>
						</template>
					</el-space>
				</el-card>
			</template>
		</Teleport>
	</div>
</template>

<script setup lang="ts">
import { floor, ceil, uniqBy, min, groupBy } from 'lodash-es'
import { useWindowSize } from '@vueuse/core'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { useClipboard } from '@vueuse/core'
import { ElMessage } from 'element-plus'
import type { Song, SongList } from './type'
const props = withDefaults(defineProps<SongList>(), {
	vip: '---',
	slogan: '',
	avater: () => ({}),
	songs: () => [] as Song[],
	specSongs: () => [],
	logo: () => ({ fontFamily: 'BEYNO', fontSize: '2.7rem', height: '5rem' }),
	logoCn: '---',
	theme: '',
	tab: true
})
const source = ref('---')
const { copy, isSupported } = useClipboard({ source })
const color = ['#66bbf9', '#d69dff', '#ff9a8b', '#d1ac3c', '#58c147']
const fz = ref(16)
// 单个高（px）
const ih = ref(36.09)
const tih = ref(16.09)
const more = 9
// 宽度计算（px）
const iw = (clen: number) => ((32 + 14.53 * min([clen < 4 ? 3.5 : clen, 12])!)! / 16) * fz.value
// 动态颜色计算
// const dynamicColor = (index: number, arr: Song[], len: number) =>
// 	(ceil((index + 1) / dynamicCount(arr, len)) - 1) % color.length
// const dynamicColor2 = (index: number, arr: Song[], len: number) =>
// 	(ceil((index + 1) / dynamicCount2(arr, len)) - 1) % color.length
const dynamicColor3 = (index: number, arr: Song[], len: number) =>
	(ceil((index + 1) / dynamicCount3(arr, len)) - 1) % color.length
// 动态行个数计算
// const dynamicCount = (arr = [] as Song[], len: number) => ceil(dynamicLen(arr) / floor(wwidth.value / iw(len)))
// const dynamicCount2 = (arr = [] as Song[], len: number) => ceil(dynamicLen2(arr) / floor(wwidth.value / iw(len)))
const dynamicCount3 = (arr = [] as Song[], len: number) => ceil(arr.length / floor(wwidth.value / iw(len)))
// 动态计算文本数量，一个中午为1单位，两个小写英文作1单位
const convLen = (c: string) => {
	let l = c.length // 默认长度
	const matchr = c.match(/[a-z]/g) // 匹配小写长度
	// 默认 - 小写长 + 小写长/2
	matchr && (l = c.length - matchr!.length + ceil(matchr!.length / 2))
	return l
}
// 长度膨胀，超过11个字符，视为两个元素
// const dynamicLen = (arr: Song[]) =>
// 	ceil((arr.filter((a: Song) => convLen(a.song) > more).length * tih.value) / ih.value) + arr.length

// const dynamicLen2 = (arr: Song[]) =>
// 	floor((arr.filter((a: Song) => convLen(a.song) > more).length * tih.value) / ih.value) + arr.length

// type 中文 0，其他语言 1，流行 2，民谣 3，古风 4，R&B 5，Rap 6
// const TYPE_ENUMS: { [key: number]: string } = {
// 	0: '华语',
// 	1: '其他语言',
// 	2: '流行',
// 	3: '民谣',
// 	4: '古风',
// 	5: 'R&B',
// 	6: 'Rap'
// }
const TAG_ENUMS: { [key: number]: { label: string; color: string } } = {
	3: { label: 'NEW', color: '#58c147' },
	1: { label: 'SC', color: '#ff9a8b' },
	2: { label: '舰长', color: '#66bbf9' }
}
type Songs = {
	[key: string]: Song[]
}
// 最终组装
let songzh: Songs = {}
let gsong: Songs = {}
let singers: string[] = []
// 歌名小于5的部分
// 父容器宽，默认取视口宽
const biuldRow = (arr: Song[]) => arr.map((a) => ({ ...a, row: convLen(a.song) > more ? 2 : 1 }))

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
const resize = () => {
	const xdom: HTMLDivElement = document.getElementsByClassName('song-main')[0] as HTMLDivElement
	xdom && (wwidth.value = xdom.offsetWidth)
}
const { width } = useWindowSize()
watch(() => width.value, resize)
// 剪贴板
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
const itype = ref('song')
onMounted(() => {
	resize()
	fz.value = +getComputedStyle(document.documentElement).getPropertyValue('font-size').replace('px', '')
	ih.value = (ih.value / 16) * fz.value
	tih.value = (tih.value / 16) * fz.value
})
</script>

<style lang="scss" scoped>
@import './index.scss';
.slogan {
	background: var(--slogan);
}
</style>
