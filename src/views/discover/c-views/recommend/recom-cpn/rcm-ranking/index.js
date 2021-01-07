import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from "react-redux"

import { getRankingAction } from "../../store/actions.js"

import { RankingWrapper } from "./style.js"
import GxkRcmThemeHeader from "@/components/theme-header-rcm"

export default memo(function GxkRcmRanking() {

  //用useDispatch获得dispatch
  const dispatch = useDispatch()

  //通过useSelector获得redux中的相关的排行榜数据
  const uptops = useSelector((state) => {
    return state.get('recommend').get('uptops')
  }, shallowEqual)

  const newtops = useSelector((state) => {
    return state.get('recommend').get('newtops')
  }, shallowEqual)

  const oritops = useSelector((state) => {
    return state.get('recommend').get('oritops')
  }, shallowEqual)

  //利用useEffect在组件初始化的时候派发相关的action
  useEffect(() => {
    dispatch(getRankingAction(0))
    dispatch(getRankingAction(2))
    dispatch(getRankingAction(3))
  }, [dispatch])

  return (
    <RankingWrapper>
      <GxkRcmThemeHeader title='排行榜'></GxkRcmThemeHeader>
      <div className={'tops'}>

      </div>
    </RankingWrapper>
  )
})
