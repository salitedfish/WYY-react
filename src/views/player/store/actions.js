import { getSong } from "@/network/getSong.js"

import { GETSONG } from './static'

//下面是真正要派发的action
const changeSongAction = (currentSong) => {
  return {
    type: GETSONG,
    currentSong
  }
}

//下面是提供给目标组件的派发action的函数，因为用了redux-thunk所以可以传入函数，并发送网络请求
export const getSongAction = (ids) => {
  return dispatch => {
    getSong(ids).then((res) => {
      dispatch(changeSongAction(res.songs[0]))
    })
  }
}



