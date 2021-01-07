import React, { memo } from 'react'

//导出相关格式化函数
import { getCount, getImgUrl } from "@/utils/data-format.js"

//导出相关组件，包括样式组件和功能组件
import { SongsCoverWrapper } from "./style.js"

export default memo(function GxkMusicCover(props) {

  //解构出传过来的data
  const { data } = props

  return (
    <SongsCoverWrapper>
      <div className="cover-top">
        <img src={getImgUrl(data.picUrl || data.blurPicUrl, 140)} alt={data.name} />
        <div className="cover sprite_cover">
          <div className="info sprite_cover">
            <span>
              <i className="sprite_icon erji"></i>
              {getCount(data.playCount)}
            </span>
            <i className="sprite_icon play"></i>
          </div>
        </div>
      </div>
      <div className="cover-bottom text-nowrap">
        {data.name}
      </div>
      <div className="cover-source text-nowrap">
        by {data.copywriter || data.creator?.nickname || data.artist.name}
      </div>
    </SongsCoverWrapper>
  )
})
