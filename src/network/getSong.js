import myAxios from "./myAxios"

//通过歌曲id请求歌曲详情
export function getSong(ids = 0) {
  return myAxios({
    url: '/song/detail',
    params: {
      ids
    }
  })
}

//通过歌曲id请求歌词
export function getSongWords(id = 0) {
  return myAxios({
    url: '/lyric',
    params: {
      id
    }
  })
}