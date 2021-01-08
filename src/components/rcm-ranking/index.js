import React, { memo } from 'react'

//导入图片处理函数，这里比较特殊，因为父组件都是通过子组件数组
//渲染的方式使用子组件，当数组为空时就不会出现找不到数组的情况，
//而现在是直接通过对象获取数据，如果对象为空，会找不到数据而报错，
//因此要加一层判断
import { getImgUrl } from "@/utils/data-format"

//导入样式及功能组件
import { RankingWrapper } from "./style.js"

export default memo(function GxkRanking(props) {

  const { data } = props

  return (
    <RankingWrapper>
      <div className={'header'}>
        <div className={'image'}>
          <img src={getImgUrl(data.coverImgUrl, 80)} alt=""></img>
          <a href="loading" className={'sprite_cover cover'}>ranking</a>
        </div>
        <div className={'info'}>
          <a href='loading'>{data.name}</a>
          <div>
            <button className={'btn play sprite_02'}></button>
            <button className={'btn favor sprite_02'}></button>
          </div>
        </div>
      </div>
      <div className={'list'}>
        {
          data.tracks?.slice(0, 10).map((item, index) => {
            return (
              <div key={item.id} className={'list-item'}>
                <div className={'rank'}>
                  {index + 1}
                </div>
                <div className={'info'}>
                  <a href="loading" className={'name text-nowrap'}>
                    {item.name}
                  </a>
                  <div className={'operate'}>
                    <button className={'btn sprite_02 play'}></button>
                    <button className={'btn sprite_icon2 addto'}></button>
                    <button className={'btn sprite_02 favor'}></button>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className={'footer'}>
        <a href={'loading'} className={''}>查看全部 &gt;</a>
      </div>
    </RankingWrapper>
  )
})
