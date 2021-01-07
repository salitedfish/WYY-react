import {
  CHANGE_TOP_BANNERS,
  CHANGE_HOT,
  CHANGE_NEW,
  CHANGE_UPRANKING,
  CHANGE_NEWRANKING,
  CHANGE_ORIRANKING
} from "./static.js"

//将相关的网络请求从对应位置导入
import { getTopBanners, getHot, getNew, getRanking } from "@/network/recommend.js"

//这个是真正要派发的action//////////////////////////////////
//这个是设置轮播图数据的action
const changeTopBannerAction = (res) => {
  return {
    type: CHANGE_TOP_BANNERS,
    topBanners: res.banners
  }
}
//这个是设置热门推荐的action
const changeHotAction = (res) => {
  return {
    type: CHANGE_HOT,
    hotRecommends: res.result
  }
}
//这个是设置新碟上架的action
const changeNewAction = (res) => {
  return {
    type: CHANGE_NEW,
    news: res.albums
  }
}

//这个是设置三个排行榜的action
const changeUpRankingAction = (res) => {
  return {
    type: CHANGE_UPRANKING,
    uptops: res.playlist
  }
}
const changeNewRankingAction = (res) => {
  return {
    type: CHANGE_NEWRANKING,
    newtops: res.playlist
  }
}
const changeOriRankingAction = (res) => {
  return {
    type: CHANGE_ORIRANKING,
    oritops: res.playlist
  }
}


//这里定义派发action前要处理的事情///////////////////////////
//这里派发获取轮播图相关的action
export const getTopBannerAction = () => {
  return dispatch => {
    getTopBanners().then((res) => {
      dispatch(changeTopBannerAction(res))
    })
  }
}
//这里派发获取热门数据相关的action
export const getHotAction = (limit = 8) => {
  return dispatch => {
    getHot(limit).then((res) => {
      dispatch(changeHotAction(res))
    })
  }
}
//这里是派发获取新碟上架相关的action
export const getNewAction = (limit = 10) => {
  return (dispatch) => {
    getNew(limit).then((res) => {
      dispatch(changeNewAction(res))
    })
  }
}
//这里是派发排行榜相关的action
export const getRankingAction = (idx = 0) => {
  return (dispatch) => {
    getRanking(idx).then((res) => {
      // console.log(res)
      switch (idx) {
        case 0:
          dispatch(changeUpRankingAction(res))
          break
        case 2:
          dispatch(changeNewRankingAction(res))
          break
        case 3:
          dispatch(changeOriRankingAction(res))
          break
        default:
          break
      }
    })
  }
}
