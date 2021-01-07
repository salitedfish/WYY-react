import myAxios from "./myAxios"

//请求轮播图数据
export function getTopBanners() {
  return myAxios({
    url: '/banner'
  })
}

//请求热门推荐
export function getHot(limit = 10) {
  return myAxios({
    url: '/personalized',
    params: {
      limit
    }
  })
}

//请求新碟上架
export function getNew(limit = 10) {
  return myAxios({
    url: '/top/album',
    params: {
      limit
    }
  })
}

//请求推荐榜单数据
export function getRanking(idx = 0) {
  return myAxios({
    url: '/top/list',
    params: {
      idx,
    }
  })
}