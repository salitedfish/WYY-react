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