export interface Logo {
	fontFamily?: string
	fontSize?: string
	height?: string
}
export type Song = {
	song: string
	type: number[]
	tag: number | null
	singer: string
	row?: number
	category?: number
}
type Avater = {
	name?: string
	is?: string
	$attr?: object
	img?: boolean
	src?: string
}
export type SongList = {
	songs: Song[]
	specSongs?: Song[]
}
