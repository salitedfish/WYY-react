import React, { memo, useEffect } from 'react'
import { NavLink } from "react-router-dom"
import { renderRoutes } from "react-router-config"

//导入styled-component写的样式文件
import { DiscoverWrapper, TopMenu } from "./style.js"

// import myAxios from "@/network/myAxios.js"

//导入本地数据
import { discoverMenu } from "@/static/local-data.js"

export default memo(function GxkDiscover(props) {
  //用了renderRoutes之后，其后代组件可以在props中拿到当前的route
  const { route } = props
  return (
    <DiscoverWrapper>
      <div className='top'>
        <TopMenu className="wrap-v1">
          {
            discoverMenu.map((item, index) => {
              return (
                <div className="item" key={item.title}>
                  <NavLink to={item.link}>{item.title}</NavLink>
                </div>
              )
            })
          }
        </TopMenu>
      </div>
      {
        renderRoutes(route.routes)
      }
    </DiscoverWrapper>
  )
})

