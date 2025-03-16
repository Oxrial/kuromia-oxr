<template>
	<SongItem
		:songs="isongs"
		:categories="categories"
		:slogan="slogan"
		:avater="{ is: 'ElImage', img: true }"
		vup="KUROMIA"
		logo-cn="库洛米娅"
	/>
</template>

<script setup lang="ts">
import type { Song } from '@/components/song-item/type'
import slogan from '@/assets/cool-background.png'
import songs1 from '@/assets/songs/kuromia/unknown'
import songs2 from '@/assets/songs/kuromia'
const isongs = [...songs1, ...songs2] as Song[]
const categories = {
	unknown: '未分类'
}
</script>

<style lang="scss" scoped></style>
