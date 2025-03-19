import { ceil } from 'lodash-es'
export const convLen = (c: string) => {
	let l = c.length // 默认长度
	const matchr = c.match(/[a-z]/g) // 匹配小写长度
	// 默认 - 小写长 + 小写长/2
	matchr && (l = c.length - matchr!.length + ceil(matchr!.length / 2))
	return l
}
