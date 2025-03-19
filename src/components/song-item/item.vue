<template>
	{{ iw }}
	<template v-for="(songs, index) in songss">
		<div
			class="song-columns-container"
			:style="{ columns: songs.columns }"
			:ref="(ref) => setPartRef(ref, 'part_' + index)"
		>
			<el-badge
				v-for="(item, index) in songs.list"
				:hidden="!item.tag || (item.tag && item.tag !== 3) as boolean"
				:value="item.tag ? TAG_ENUMS[item.tag].label : ''"
				:color="(item.tag && TAG_ENUMS[item.tag].color + '22') || '#a2d3ff'"
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
				<el-tag
					disable-transitions
					type="info"
					:color="
						(theme
							? theme
							: color[resolveColor(index + 1, songs.length, iw['part_' + index])] || '#a2d3ff') + '11'
					"
					:style="{
						'border-left': `.3125rem ${
							(theme
								? theme
								: color[resolveColor(index + 1, songs.length, iw['part_' + index])] || '#a2d3ff') + '44'
						} solid`
					}"
					@click="copySong(item)"
				>
					{{ item.song }}
				</el-tag>
			</el-badge>
		</div>
	</template>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { SliceSong, Song } from './type'
import { convLen } from './index'
import { ceil, floor } from 'lodash-es'
import { useWindowSize } from '@vueuse/core'
withDefaults(defineProps<{ songss: SliceSong[]; theme?: string }>(), {
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
const iw = reactive<{ [key: string]: number }>({})
let partRefs: { [key: string]: any } = {}
const setPartRef = (el: any, category: string) => {
	if (el) {
		partRefs[category] = el
	}
}
const resolveColor = computed(() => (i: number, length: number, iw: number) => {
	console.log(i % (length / ceil(length / floor(wwidth.value / iw))))
	return i % (length / ceil(length / floor(wwidth.value / iw)))
})
onMounted(() => {
	console.log(partRefs)
	Object.keys(partRefs).forEach((p) => {
		iw[p] = partRefs[p].children[0].offsetWidth
		console.log(
			p,
			partRefs[p].offsetWidth,
			partRefs[p].children[0].offsetWidth,
			floor(partRefs[p].offsetWidth / partRefs[p].children[0].offsetWidth),
			ceil(partRefs[p].children.length / floor(partRefs[p].offsetWidth / partRefs[p].children[0].offsetWidth))
		)
	})
})

const wwidth = ref(window.innerWidth)
const resize = () => {
	const xdom: HTMLDivElement = document.getElementsByClassName('song-columns-container')[0] as HTMLDivElement
	xdom && (wwidth.value = xdom.offsetWidth)
}
const { width } = useWindowSize()
watch(() => width.value, resize)
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
	justify-content: unset;
}
.song-item,
.song-columns-container :deep(.el-space__item) {
	break-inside: avoid; /* 防止元素跨列分割 */
	transition: all 0.3s;
	width: 100%;
	.el-tag {
		font-size: 1.05rem;
		height: 40px;
	}
}

.song-item.long-text {
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	.el-tag {
		font-size: 0.9rem;
	}
}
</style>
