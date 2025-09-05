import fs from 'fs'
import path from 'path'
import songs from './kaka.js'
const data = []
// type 中文 0，其他语言 1，流行 2，民谣 3，古风 4，R&B 5，Rap 6
export const TYPE_ENUMS = {
	0: '华语',
	1: '英文',
	2: '流行',
	3: '民谣',
	4: '古风',
	5: 'R&B',
	6: 'Rap',
	7: 'K-POP'
}
const Categrory = {
	zh: 0,
	eng: 1,
	pop: 2,
	folk: 3,
	ancient: 4,
	rnb: 5,
	rap: 6,
	kpop: 7
}
export const TYPES = {
	中文: '0',
	粤语: '0',
	其他语言: '1',
	英文: '1',
	说唱: '',
	舰长: '',
	SC: '',
	流行: '2',
	民谣: '3',
	古风: '4',
	'R&B': '5',
	Rap: '6',
	KPop: '7'
}
export const TAG_ENUMS = {
	0: 'NEW',
	1: 'SC',
	2: '舰长'
}
export const TAGS = {
	NEW: '0',
	SC: '1',
	舰长: '2'
}
Object.keys(songs).forEach((k) => {
	const [ki, tag] = k.split('_')
	data.push(
		...songs[k].map((v) => ({
			song: v,
			type: [Categrory[ki]],
			singer: '',
			tag
		}))
	)
})
// console.log(data)

// fs.writeFileSync(path.join('src', 'assets', 'datatutu.json'), JSON.stringify(data))
const typer = (s) =>
	s
		.split('；')
		.map((str) => TYPES[str])
		.filter((m) => !!m)
		.map((m) => +m)
		.sort()

import data1 from '../src/assets/songs/chenzai/index.js'

// fs.writeFileSync(path.join('src', 'assets', 'chenzaidata.json'), JSON.stringify(data1))
const resolve = (data, resolveData) => {
	data.forEach((d) => {
		const dt = resolveData.find((b) => b.song === d.song)
		if (dt) {
			d.singer = dt.singer
			// d.type = dt.type
		}
	})
}
resolve(data, data1)
// import data2 from './songs/kuromia/index.js'
// resolve(data, data2)
// console.log(data)
fs.writeFileSync(path.join('src', 'assets', 'songs', 'kaka', 'index.js'), 'export default ' + JSON.stringify(data))
// fs.writeFileSync(path.join('src', 'assets', 'chenzaidata.json'), JSON.stringify(data1))
