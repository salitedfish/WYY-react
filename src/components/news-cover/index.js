import React, { memo } from 'react'

//导入图片url处理工具函数
import { getImgUrl } from "@/utils/data-format"

//导入各种组件包括样式组件和功能组件
import { NewWrapper } from "./style.js"

export default memo(function GxkNewCover(props) {

  //解构出使用者导入的props数据,默认值都是100
  const { data, width = 100, size = 100, bgp = '-845px' } = props
  
  return (
    <NewWrapper width={width} size={size} bgp={bgp}>
      <div className={'album-image'}>
        <img src={getImgUrl(data.blurPicUrl, size)} alt={data.company}></img>
        <a href="loading" className={'cover sprite_cover'}>网易云音乐</a>
      </div>
      <div className={'album-info'}>
        <div className={'name'}>{data.name}</div>
        <div className={'artist'}>{data.artist.name}</div>
      </div>
    </NewWrapper>
  )
})
