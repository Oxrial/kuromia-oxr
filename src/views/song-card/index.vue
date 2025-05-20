<template>
	<SongCard
		:songs="isongs"
		:slogan="slogan"
		:avater="{ is: 'ElImage', img: true }"
		vup="KUROMIA"
		logo-cn="库洛米娅"
	/>
</template>

<script setup lang="ts">
import type { Song } from '@/components/song-card/type'
import slogan from '@/assets/cool-background.png'
import songs1 from '@/assets/songs/kuromia/unknown'
import songs2 from '@/assets/songs/kuromia'
const isongs = [...songs1, ...songs2] as Song[]
</script>

<style lang="scss" scoped>
.main-container {
	background-image: linear-gradient(
		45deg,
		#fffcfd 25%,
		#66bbf922 25%,
		#d69dff22 50%,
		#fffcfd 50%,
		#fffcfd 75%,
		#ff9a8b22 75%,
		#d1ac3c22 100%
	);
}
</style>
