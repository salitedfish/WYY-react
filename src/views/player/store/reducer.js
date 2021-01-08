import { Map } from "immutable"

import { GETSONG } from './static'

const defaultState = Map({
  currentSong: []
})

//这个是player的store的reducer
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case GETSONG:
      return state.set('currentSong',action.currentSong)
    default:
      return state
  }
}

export default reducer