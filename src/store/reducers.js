//本来是用的原生redux中的combineReducers，用redux-immutable中的有利于性能优化
import { combineReducers } from "redux-immutable"


//从各个模块中导入reducer
import { reducer as recommendReducer } from "@/views/discover/c-views/recommend/store/index.js"
import { reducer as playerReducer } from "@/views/player/store"

//集合所有reducer
const reducers = combineReducers({
  recommend: recommendReducer,
  player: playerReducer
})

export default reducers
