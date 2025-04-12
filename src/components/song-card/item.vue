<template>
	<template v-for="songs in isongss?.map((x) => resolveLoop(x, width))">
		<div class="song-columns-container" :style="{ columns: `${songs.columns}rem auto` }">
			<div v-for="item in songs.list" class="song-item" :class="{ 'long-text': convLen(item.song) >= 9 }">
				<el-badge
					:hidden="!item.tag || (item.tag && item.tag !== 3) as boolean"
					:value="item.tag ? item.tagE?.label : ''"
					:color="(item.tag && item.tagE?.color + '22') || '#a2d3ff'"
					:badge-style="{
						color: (item.tag && item.tagE?.color) || '#a2d3ff',
						fontSize: '.6rem',
						borderWidth: 0,
						padding: '.125rem .375rem'
					}"
					:offset="[-16, 5]"
				>
					<el-tag
						disable-transitions
						type="info"
						:color="(theme ? theme : color[item.color!] || '#a2d3ff') + '11'"
						:style="{
						'border-left': `.3125rem ${
							(theme ? theme : color[item.color!] || '#a2d3ff') +
							'44'
						} solid`,
						color: theme ? theme : color[item.color!] || '#a2d3ff'
					}"
						@click="copySong(item)"
					>
						{{ item.song }}
					</el-tag>
				</el-badge>
			</div>
		</div>
	</template>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { SliceSong, Song } from './type'
import { convLen } from './index'
import { ceil, floor } from 'lodash-es'
import { useWindowSize } from '@vueuse/core'
const props = withDefaults(defineProps<{ songss: SliceSong[]; theme?: string }>(), {
	songss: () => [],
	theme: ''
})
const TAG_ENUMS: { [key: number]: { label: string; color: string } } = {
	3: { label: 'NEW', color: '#58c147' },
	1: { label: 'SC', color: '#ff9a8b' },
	2: { label: '舰长', color: '#66bbf9' }
}

const color = ['#66bbf9', '#d69dff', '#ff9a8b', '#d1ac3c', '#58c147']
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
const isongss = ref<SliceSong[]>()
const resolveLoop = (sliceSong: SliceSong, wwidth: number) => {
	const rowcount = floor(((wwidth - 15) / 2 - 32) / ceil(rem.value * sliceSong.columns + 4))
	const colcount = ceil(sliceSong.list.length / rowcount)
	sliceSong.list.forEach((s, i) => {
		s.tag && (s.tagE = TAG_ENUMS[s.tag])
		s.color = ceil((i + 1) / colcount - 1) % color.length
	})
	return sliceSong
}
watch(
	() => props.songss,
	(n) => {
		isongss.value = n
	},
	{ immediate: true, deep: true }
)

const rem = ref(parseInt(getComputedStyle(document.documentElement).fontSize))
const { width } = useWindowSize()
</script>

<style lang="scss" scoped>
.song-columns-container {
	column-gap: 0.625rem;
}
.el-tag {
	min-width: 4.5rem;
	width: inherit;
	margin-bottom: 0.75rem;
	line-height: unset;
	padding: 0.25rem 0.5625rem;
	height: unset;
	white-space: break-spaces;
}
.song-item,
.song-columns-container :deep(.el-space__item) {
	break-inside: avoid; /* 防止元素跨列分割 */
	transition: all 0.3s;
	// width: 100%;
	.el-tag {
		font-size: 0.875rem;
		height: 35px;
	}
}
.song-item {
	padding-bottom: 5px;
}

.song-item.long-text {
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	padding-bottom: unset;
	.el-tag {
		font-size: 0.8rem;
		height: 40px;
	}
}
</style>
