<template>
	<SongItem :songs="isongs" />
</template>

<script setup lang="ts">
import type { Song } from '@/components/song-item/type'
import songs1 from '@/assets/songs/kuromia/unknown'
import songs2 from '@/assets/songs/kuromia'
const isongs = [...songs1, ...songs2] as Song[]
</script>

<style lang="scss" scoped></style>
