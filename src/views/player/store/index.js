//统一导入这个store的action
import {
  getSongAction,
  addSongAction,
  autoChangeSongAction,
  getChangeSequenceAction,
  changeIsplaying,
  getSongWordsAction,
  changeCurrentLyricAction
} from "./actions"

//统一导入这个store的reducer
import reducer from "./reducer.js"

//统一导入这个store的action和reducer
export {
  getSongAction,
  addSongAction,
  autoChangeSongAction,
  getChangeSequenceAction,
  changeIsplaying,
  getSongWordsAction,
  changeCurrentLyricAction
}
export { reducer }