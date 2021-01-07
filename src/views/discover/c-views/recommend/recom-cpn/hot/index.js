import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from "react-redux"

//导入获取热门推荐的action
import { getHotAction } from "../../store/actions"

//导入相关的组件，包括样式组件和功能组件
import { HotRecommendWrapper } from "./style.js"
import GxkRcmThemeHeader from "@/components/theme-header-rcm"
import GxkMusicCover from "@/components/music-cover"

export default memo(function GxkHot() {

  //利用hook获取到dispatch
  const dispatch = useDispatch()

  //利用hook派发dispatch，获取热门数据
  useEffect(() => {
    dispatch(getHotAction(8))
  }, [dispatch])

  //通过useSelector获取到redux里面的数据，之前是用connect通过props获取的
  const hotList = useSelector((state) => {
    return state.get('recommend').get('hotRecommends')
  }, shallowEqual)

  return (
    <HotRecommendWrapper>
      <GxkRcmThemeHeader
        title="热门推荐"
        keywords={['华语', '流行', '摇滚', '民谣', '电子']}>
      </GxkRcmThemeHeader>
      <div className="recommend-list">
        {
          hotList.map((item) => {
            return (
              <GxkMusicCover data={item} key={item.id} />
            )
          })
        }
      </div>
    </HotRecommendWrapper>
  )
})
