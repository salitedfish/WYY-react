//导入主要包的相关函数方法
import React, { memo, useEffect, useRef, useState, useCallback } from 'react'
import { useDispatch, useSelector, shallowEqual } from "react-redux"


//导入自定义的相关方法
import { getSongAction } from "../store"
import { getImgUrl, getData, getPlaySong } from '@/utils/data-format.js'


//导入相关组件，包括样式组件和功能组件
import { Slider } from 'antd';
import { PlayerBarWrapper, Control, PlayInfo, Operator } from "./style.js"

//定义和导出组件
export default memo(function GxkPlayerBar() {

  //使用useState管理本组件数据
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [songProgress, setSongProgress] = useState(0)
  const [isChange, setIsChange] = useState(false)
  const [startPlay, setStartPlay] = useState(false)

  //使用react-redux的hook生成dispatch
  const dispatch = useDispatch()

  //使用react-redux的hook获得state的数据
  const song = useSelector((state) => {
    return state.get('player').get('currentSong')
  }, shallowEqual)

  //获取歌曲的总时长,并使用时间格式化函数进行格式化
  const totalTime = song.dt || 0
  const resTime = getData(totalTime, 'mm:ss')

  //使用react的hook，做和类组件生命周期函数类似的工作
  useEffect(() => {
    dispatch(getSongAction(167876))
  }, [dispatch])

  const url = 'https://music.163.com/song/media/outer/url'
  useEffect(() => {
    audioRef.current.src = getPlaySong(url, song.id)
  }, [url, song])

  //使用hook获得ref
  const audioRef = useRef()

  //设置播放和暂停歌曲的函数
  const songPlayControl = useCallback(() => {
    if (!startPlay) {
      setStartPlay(true)
    }
    if (!isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
    setIsPlaying(!isPlaying)
  }, [startPlay, setStartPlay, audioRef, isPlaying])

  //监听歌曲播放时间的函数,和格式化后的时间
  const songPlayTime = (e) => {
    if (!isChange) {
      setCurrentTime(e.target.currentTime * 1000)
      setSongProgress(((currentTime / totalTime) || 0) * 100)
    }
  }
  const currentTimeFormated = getData(Math.floor(currentTime), 'mm:ss')

  //手动拖动进度条
  const sliderChange = useCallback((value) => {
    setIsChange(true)
    setCurrentTime(value / 100 * totalTime)
    setSongProgress(value)
  }, [totalTime])

  const sliderAfterChange = useCallback((value) => {
    audioRef.current.currentTime = value / 100 * totalTime / 1000
    setCurrentTime(audioRef.current.currentTime * 1000)
    setIsChange(false)

    if (!isPlaying && startPlay) {
      songPlayControl()
    }
  }, [totalTime, isPlaying, startPlay, songPlayControl])


  //组件主要部分
  return (
    <PlayerBarWrapper className={'sprite_player'} >
      <div className={'content wrap-v2'}>

        {/**播放控制部分 */}
        <Control isPlaying={isPlaying}>
          <button className={'prev sprite_player'}></button>
          <button className={'play sprite_player'} onClick={() => { songPlayControl() }} ></button>
          <button className={'next sprite_player'}></button>
        </Control>

        {/**进度条部分 */}
        <PlayInfo>
          <div className={'image'}>
            <a href={'loading'}>
              <img src={getImgUrl(song.al?.picUrl, 35)} alt={'none'}></img>
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
              <Slider defaultValue={0}
                disabled={false}
                value={songProgress}
                tooltipVisible={false}
                step={0.1}
                onChange={sliderChange}
                onAfterChange={sliderAfterChange} />
              <div className={'time'}>
                <span className={'now-time'}>{currentTimeFormated}</span>
                <span className={'divider'}>/</span>
                <span className={'duration'}>{resTime}</span>
              </div>
            </div>
          </div>
        </PlayInfo>

        {/**其他功能部分 */}
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
      <audio ref={audioRef} onTimeUpdate={(e) => { songPlayTime(e) }}></audio>
    </PlayerBarWrapper>
  )
})
