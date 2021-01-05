import React, { memo } from 'react'
import { renderRoutes } from "react-router-config"
import { HashRouter } from "react-router-dom"
import { Provider } from "react-redux"

import routes from "@/router"
import store from "@/store"

import GxkAppHeader from "@/components/app-header"
import GxkAppFooter from "@/components/app-footer"

export default memo(function App() {
  return (
    <Provider store={store}>
      {/*store由react-redux导出的provider提供给后代组件 */}
      <HashRouter>
        {/*路由最外层必须用HashRouter或BrowerRouter包裹，vue中直接用router-view就行了*/}
        {/*项目头部 */}
        <GxkAppHeader></GxkAppHeader>
        {/*项目主要内容 */}
        {
          renderRoutes(routes)
        }
        {/*项目底部 */}
        <GxkAppFooter></GxkAppFooter>
      </HashRouter>
    </Provider>
  )
})
