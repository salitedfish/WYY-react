//导入主要包的相关函数方法
import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual } from "react-redux"

//导入自定义的相关方法
import { getSongAction } from "../store"
import { getImgUrl } from '@/utils/data-format.js'

//导入相关组件，包括样式组件和功能组件
import { Slider } from 'antd';
import { PlayerBarWrapper, Control, PlayInfo, Operator } from "./style.js"

export default memo(function GxkPlayerBar() {

  //使用react-redux的hook生成dispatch
  const dispatch = useDispatch()

  const song = useSelector((state) => {
    return state.get('player').get('currentSong')
  }, shallowEqual)

  //使用react的hook，做和类组件生命周期函数类似的工作
  useEffect(() => {
    dispatch(getSongAction(167876))
  }, [dispatch])

  return (
    <PlayerBarWrapper className={'sprite_player'}>
      <div className={'content wrap-v2'}>
        <Control>
          <button className={'prev sprite_player'}></button>
          <button className={'play sprite_player'}></button>
          <button className={'next sprite_player'}></button>
        </Control>
        <PlayInfo>
          <div className={'image'}>
            <a href={'loading'}>
              <img src={getImgUrl(song.al?.picUrl, 34)} alt={'none'}></img>
            </a>
          </div>
          <div className={'info'}>
            <div className={'song'}>
              <span className={'song-name'}>
                {song.name}
              </span>
              <a href={'loading'} className={'singer-name'}>
                {song.ar?.[0].name}
              </a>
            </div>
            <div className={'progress'}>
              <Slider defaultValue={30} disabled={false} />
              <div className={'time'}>
                <span className={'now-time'}>03:00</span>
                <span className={'divider'}>/</span>
                <span className={'duration'}>06:30</span>
              </div>
            </div>
          </div>
        </PlayInfo>
        <Operator>
          <div className={''}>
            <button className={'sprite_player btn favor'}></button>
            <button className={'sprite_player btn share'}></button>
          </div>
          <div className={'right sprite_player'}>
            <button className={'sprite_player  btn volume'}></button>
            <button className={'sprite_player  btn loop'}></button>
            <button className={'sprite_player btn playlist'}></button>
          </div>
        </Operator>
      </div>
    </PlayerBarWrapper>
  )
})
