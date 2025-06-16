<template>
	<SongCard
		:songs="isongs"
		:slogan="slogan"
		:avater="{ src: logo, $attr: { img: true } }"
		vup="Mi"
		logo-cn="米粒儿"
		:color="['#1f679d', '#26838d', '#1f9d58', '#398d26']"
		:cates="[
			{
				label: '说唱',
				code: 'rap',
				value: 6
			}
		]"
	/>
</template>

<script setup lang="ts">
import type { Song } from '@/components/song-card/type'
import slogan from '@/assets/songs/mi/logo-bgi.png'
import songs2 from '@/assets/songs/mi'
import logo from '@/assets/songs/mi/logo.webp'
const isongs = [...songs2] as Song[]
</script>

<style lang="scss" scoped>
.main-container {
	background-image: linear-gradient(
		45deg,
		#fffcfd 25%,
		#66bbf922 25%,
		#67c23a22 50%,
		#fffcfd 50%,
		#fffcfd 75%,
		#409eff22 75%,
		#409eff55 100%
	);
	:deep(.el-card:not(:first-child)) {
		background: transparent;
		backdrop-filter: blur(10px);
	}
}
</style>
