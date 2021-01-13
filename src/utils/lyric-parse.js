
//创建正则表达式，用来匹配[00:00.000]
const parseExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

//对歌词进行解析，返回一个包含时间和歌词对象的数组
export function parseLyric(lyricString) {
  const lyricArray = []
  //将歌词按照\n分裂成一个数组
  const lineString = lyricString.split('\n');
  //对数组每一项进行解析
  for (let line of lineString) {
    if (line) {
      //对时间进行解析成毫秒，但是因为拿到的是字符串，需要乘以数字从而变成数字形式
      const result = parseExp.exec(line)
      if (!result) continue
      const time3 = result[3].length === 3 ? result[3] * 1 : result[3] * 10
      const resultTime = result[1] * 60 * 1000 + result[2] * 1000 + time3
      //获取剩下的内容,通过replace方法替换掉时间,并去除字符串两边的空字符
      const content = line.replace(parseExp, '').trim()
      //再把时间和歌词组合成一个对象
      const lyricObj = {
        time: resultTime,
        content
      }
      //再将对象组合成一个数组
      lyricArray.push(lyricObj)
    }
  }
  //采用冒泡排序的算法，对歌词数组进行排序
  for (let i = 0; i < lyricArray.length - 1; i++) {
    for (let j = 0; j < lyricArray.length - 1 - i; j++) {
      if (lyricArray[j].time > lyricArray[j + 1].time) {
        let a = lyricArray[j + 1]
        lyricArray[j + 1] = lyricArray[j]
        lyricArray[j] = a
      }
    }
  }
  //返回包含对象歌词的数组
  return lyricArray
}