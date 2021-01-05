import React, { memo } from 'react'
import PropTypes from "prop-types"

import { HeaderWrapper } from "./style.js"

const GxkRcmThemeHeader = memo((props)=>{
  const { title, keywords } = props
  return (
    <HeaderWrapper className="sprite_02">
      <div className="left">
        <h2 className="title">{title}</h2>
        <div className="keyword">
          {
            keywords?.map((item, index) => {
              return (
                <div className="item" key={item}>
                  <a href="loading">{item}</a>
                  <span className="divider">|</span>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className="right">
        <a href="loading">更多</a>
        <i className="icon sprite_02"></i>
      </div>
    </HeaderWrapper>
  )
})


//对prop的传值进行一个校验
GxkRcmThemeHeader.propTypes = {
  title: PropTypes.string.isRequired,
  ketwords: PropTypes.array
}

GxkRcmThemeHeader.defaultProps = {
  keywords: []
}

export default GxkRcmThemeHeader
