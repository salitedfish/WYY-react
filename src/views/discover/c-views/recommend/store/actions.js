import {
  CHANGE_TOP_BANNERS
} from "./static.js"

import { getTopBanners } from "@/network/recommend.js"

//这个是真正要派发的action
const changeTopBannerAction=(res)=>{
  return {
    type: CHANGE_TOP_BANNERS,
    topBanners: res.banners
  }
}

//这里定义派发action前要处理的事情
export const getTopBannerAction = () => {
  return dispatch => {
    getTopBanners().then((res)=>{
      dispatch(changeTopBannerAction(res))
    })
  }
}