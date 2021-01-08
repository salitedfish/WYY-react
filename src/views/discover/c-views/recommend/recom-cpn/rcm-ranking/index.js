import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from "react-redux"

//导入派发action的的函数
import { getRankingAction } from "../../store/actions.js"

//导入样式及其他功能组件
import { RankingWrapper } from "./style.js"
import GxkRcmThemeHeader from "@/components/theme-header-rcm"
import GxkRanking from "@/components/rcm-ranking"

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
        <GxkRanking data={uptops}></GxkRanking>
        <GxkRanking data={newtops}></GxkRanking>
        <GxkRanking data={oritops}></GxkRanking>
      </div>
    </RankingWrapper>
  )
})
