import React, { memo } from 'react'

import { HotRecommendWrapper } from "./style.js"
import GxkRcmThemeHeader from "@/components/theme-header-rcm"

export default memo(function GxkHot() {
  return (
    <HotRecommendWrapper>
      <GxkRcmThemeHeader
        title="热门推荐"
        keywords={['华语','流行','摇滚','民谣','电子']}>
      </GxkRcmThemeHeader>
    </HotRecommendWrapper>
  )
})
