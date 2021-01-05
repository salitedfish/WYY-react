import { Map } from "immutable"

import {
  CHANGE_TOP_BANNERS
} from "./static.js"

//设置state的默认值
const defaultState = Map({
  topBanners: []
})

//设置recommend的reducer，每个组件分开管理自己的reducer
function reducer(state = defaultState, action) {
  switch (action.type) {
    case CHANGE_TOP_BANNERS:
      return state.set('topBanners', action.topBanners)
    default:
      return state;
  }
}

export default reducer
