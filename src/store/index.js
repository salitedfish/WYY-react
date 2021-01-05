import { createStore, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"

import reducers from "./reducers.js"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

//创建store
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(thunk)
));

export default store