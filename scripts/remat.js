import fs from 'fs'
import path from 'path'
import songs from '../src/assets/songs/kuromia/index.js'

const CategroryN = {
	0: 'zh',
	1: 'eng',
	2: 'pop',
	3: 'folk',
	4: 'ancient',
	5: 'rnb',
	6: 'rap',
	7: 'kpop'
}
const data = {}
const dks = Object.keys(CategroryN).sort((a, b) => b - a)

songs.forEach((s) => {
	for (let k in dks) {
		!data[CategroryN[k]] && (data[CategroryN[k]] = [])
		s.type.includes(+k) && data[CategroryN[k]].push(s.song)
	}
})

fs.writeFileSync(path.join('src', 'assets', 'kuromia.js'), 'export default ' + JSON.stringify(data))
