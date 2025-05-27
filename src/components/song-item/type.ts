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
	category?: number
	len?: number
}
type Avater = {
	name?: string
	is?: string
	$attr?: object
	img?: boolean
	src?: string
}
type Categories = {
	label: string
	order: number
}
export type SongList = {
	songs: Song[]
	categories: { [k in string]: Categories }
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
