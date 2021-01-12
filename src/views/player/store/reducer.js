import { Map } from "immutable"

import {
  GETSONG,
  CHANGE_PLAY_LIST,
  CHANGE_SONG_INDEX,
  CHNAGE_SEQUENCE,
  CHANGE_ISPLAYING,
  CHANGE_SONGWORDS
} from './static'

const defaultState = Map({
  currentSong: [],
  currentSongIndex: 0,
  playList: [],
  sequence: 0,//0为循环，1为随机，2为单曲
  isPlaying: false,
  lyricList: []
})

//这个是player的store的reducer
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case GETSONG:
      return state.set('currentSong', action.currentSong)
    case CHANGE_PLAY_LIST:
      return state.set('playList', action.playList)
    case CHANGE_SONG_INDEX:
      return state.set('currentSongIndex', action.currentSongIndex)
    case CHNAGE_SEQUENCE:
      return state.set('sequence', action.sequence)
    case CHANGE_ISPLAYING:
      return state.set('isPlaying', action.isPlaying)
    case CHANGE_SONGWORDS:
      return state.set('lyricList', action.lyricList)
    default:
      return state
  }
}

export default reducer