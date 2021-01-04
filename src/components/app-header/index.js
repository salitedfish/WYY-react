import React, { memo } from 'react'
import { NavLink } from "react-router-dom"
import { Input } from "antd"
import { SearchOutlined } from "@ant-design/icons"

import { HeaderWrapper } from "./style.js"
import { headerLinks } from "@/static/local-data.js"


export default memo(function GxkAppHeader() {

  const showSelectItem = (item, index) => {
    if (index < 3) {
      return (
        <NavLink to={item.link} key={item.title} className='select-item'>
          {item.title}
          <div className='icon sprite_01'></div>
        </NavLink>
      )
    } else {
      return (
        <a href={item.link} key={item.title} className='select-item'>{item.title}</a>
      )
    }
  }

  return (
    <HeaderWrapper>
      {/*下面为header主要内容 */}
      <div className='header-content wrap-v1'>
        {/*下面为header左边内容 */}
        <div className="content-left">
          <a href="#/">
            <div className="left-logo sprite_01"></div>
          </a>
          <div className="select-list">
            {
              headerLinks.map(showSelectItem)
            }
          </div>
        </div>
        {/*下面为header右边内容 */}
        <div className='content-right'>
          <Input
            placeholder="音乐/视频/电台/用户"
            prefix={<SearchOutlined />}
            className='right-search'></Input>
          <div className="user-center">创作者中心</div>
          <div className="login">登录</div>
        </div>
      </div>
      {/*下面为header底部红条 */}
      <div className='divider'></div>
    </HeaderWrapper>
  )
})


