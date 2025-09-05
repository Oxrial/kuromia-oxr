<template>
	<SongCard
		:songs="isongs"
		:slogan="slogan"
		:avater="{ src: logo, $attr: { img: true } }"
		vup="KAKA"
		logo-cn="优祈"
		:color="['#932e2e', '#5A4085', '#3b78af', '#328339']"
		:cates="[
			{
				label: '流行',
				code: 'pop',
				value: 2
			},
			{
				label: '古风',
				code: 'ancient',
				value: 4
			},
			{
				label: 'Kpop',
				code: 'kpop',
				value: 7
			}
		]"
	/>
</template>

<script setup lang="ts">
import type { Song } from '@/components/song-card/type'
import slogan from '@/assets/songs/kaka/logo-bgi.png'
import songs2 from '@/assets/songs/kaka'
import logo from '@/assets/songs/kaka/logo.webp'
const isongs = [...songs2] as Song[]
</script>

<style lang="scss" scoped>
.main-container {
	background-image: linear-gradient(
		45deg,
		#fffcfd 25%,
		#66bbf922 25%,
		#7a3ac222 50%,
		#fffcfd 50%,
		#fffcfd 75%,
		#409eff22 75%,
		#4f3d7555 100%
	);
	:deep(.el-card:not(:first-child)) {
		background: transparent;
		backdrop-filter: blur(10px);
	}
}
</style>
