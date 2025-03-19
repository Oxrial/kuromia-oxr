export interface Logo {
	fontFamily?: string
	fontSize?: string
	height?: string
}
export type Song = {
	song: string
	type?: number[]
	tag?: number | null
	singer?: string
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
	categories: object
	avater?: Avater
	vup: string
	slogan?: string
	logo?: Logo
	logoCn?: string
}

export type SliceSong = {
	columns: string
	list: Song[]
	length: number
}
