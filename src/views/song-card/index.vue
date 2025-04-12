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

<style lang="scss" scoped></style>
