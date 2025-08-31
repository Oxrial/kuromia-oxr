export interface Logo {
	fontFamily?: string
	fontSize?: string
	height?: string
	img?: string
}
export type Song = {
	song: string
	type: number[]
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
type Cate = {
	label: string
	code: string
	value: number
}
export type SongProp = {
	songs: Song[]
	avater?: Avater
	vup: string
	slogan?: string
	logo?: Logo
	logoCn?: string
	pnglogo?: string
	theme?: string
	color?: string[]
	cates?: Cate[]
}
type Tag = {
	label: string
	color: string
}

export type SliceSong = {
	columns: number
	list: Song[]
}
