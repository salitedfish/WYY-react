import { Map } from "immutable"

import {
  CHANGE_TOP_BANNERS,
  CHANGE_HOT,
  CHANGE_NEW,
  CHANGE_UPRANKING,
  CHANGE_NEWRANKING,
  CHANGE_ORIRANKING
} from "./static.js"

//设置recommend分支的state的默认值，注意这个默认state不是整个store的默认值
const defaultState = Map({
  topBanners: [],
  hotRecommends: [],
  news: [],
  uptops: [],
  newtops: [],
  oritops: [],
})

//设置recommend的reducer，每个组件分开管理自己的reducer
function reducer(state = defaultState, action) {
  switch (action.type) {
    case CHANGE_TOP_BANNERS:
      return state.set('topBanners', action.topBanners)

    case CHANGE_HOT:
      return state.set('hotRecommends', action.hotRecommends)

    case CHANGE_NEW:
      return state.set('news', action.news)

    case CHANGE_UPRANKING:
      return state.set('uptops', action.uptops)

    case CHANGE_NEWRANKING:
      return state.set('newtops', action.newtops)

    case CHANGE_ORIRANKING:
      return state.set('oritops', action.oritops)
      
    default:
      return state;
  }
}

export default reducer
