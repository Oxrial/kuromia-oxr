export interface Logo {
	fontFamily?: string
	fontSize?: string
	height?: string
}
export type Song = {
	song: string
	type?: number[]
	tag?: number | null
	tagE?: Tag
	color?: number
	singer?: string
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
	avater?: Avater
	vup: string
	slogan?: string
	logo?: Logo
	logoCn?: string
}
type Tag = {
	label: string
	color: string
}

export type SliceSong = {
	columns: number
	list: Song[]
	length: number
}
