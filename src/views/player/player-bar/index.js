//导入主要包的相关函数方法
import React,
{
  memo,
  useEffect,
  useRef,
  useState,
  useCallback
} from 'react'

import {
  useDispatch,
  useSelector,
  shallowEqual
} from "react-redux"
import { NavLink } from "react-router-dom"

//导入自定义的相关方法
import {
  getSongAction,
  autoChangeSongAction,
  getChangeSequenceAction,
  changeIsplaying,
  changeCurrentLyricAction
} from "../store"

import {
  getImgUrl,
  getData,
  getPlaySong
} from '@/utils/data-format.js'

//导入相关组件，包括样式组件和功能组件
import { Slider } from 'antd';

import {
  PlayerBarWrapper,
  Control,
  PlayInfo,
  Operator
} from "./style.js"


//定义和导出组件
export default memo(function GxkPlayerBar(props) {

  //使用useState管理本组件数据
  const [currentTime, setCurrentTime] = useState(0)
  const [songProgress, setSongProgress] = useState(0)
  const [isChange, setIsChange] = useState(false)
  const [currentLyric, changeCurrentLyric] = useState('')

  //使用react-redux的hook生成dispatch和store的数据
  const dispatch = useDispatch()
  const index = useSelector((state) => {
    return state.get('player').get('currentSongIndex')
  }, shallowEqual)
  const sequence = useSelector((state) => {
    return state.get('player').get('sequence')
  }, shallowEqual)
  const playList = useSelector((state) => {
    return state.get('player').get('playList')
  }, shallowEqual)
  const isPlaying = useSelector((state) => {
    return state.get('player').get('isPlaying')
  }, shallowEqual)
  const song = useSelector((state) => {
    return state.get('player').get('currentSong')
  }, shallowEqual)
  const lyricList = useSelector((state) => {
    return state.get('player').get('lyricList')
  }, shallowEqual)
  const currentLyricTime = useSelector((state) => {
    return state.get('player').get('currentLyricTime')
  })

  //使用react的hook，做和类组件生命周期函数类似的工作,注意不同功能的effect最好不要写在一起
  //以免引起不必要的刷新

  //使用react的hook获得ref
  const audioRef = useRef()
  //初始化时就派发一个获取歌曲的初始action，后面都不会再用了
  useEffect(() => {
    dispatch(getSongAction(167876))
  }, [dispatch])
  //当state里面选中的歌曲改变时，重新给audio添加上src
  const url = 'https://music.163.com/song/media/outer/url'
  useEffect(() => {
    audioRef.current.src = getPlaySong(url, song.id)
    setCurrentTime(0)
  }, [url, song.id])
  //每当歌曲改变和播放状态改变时执行，按照播放状态判断是否播放
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying, song.id])

  //获取歌曲的总时长,并使用时间格式化函数进行格式化
  const totalTime = song.dt || 0
  const resTime = getData(totalTime, 'mm:ss')

  //点击播放和暂停歌曲的函数,注意这里只是改变state的播放状态
  const songPlayControl = useCallback(() => {
    dispatch(changeIsplaying(!isPlaying))
  }, [isPlaying, dispatch])

  //切换下一首歌曲,根据sequence和index来判断
  const changeNextSong = () => {
    //如果歌单里面只有一首歌则直接重新播放
    if (playList.length === 1) {
      audioRef.current.currentTime = 0
      setCurrentTime(0)
      return
    }
    setCurrentTime(0)
    let newIndex = index
    if (sequence === 1) {
      newIndex = Math.floor(Math.random() * playList.length)
    } else {
      if ((newIndex + 1) > (playList.length - 1)) {
        newIndex = 0
      } else {
        newIndex = newIndex + 1
      }
    }
    dispatch(autoChangeSongAction(newIndex))
  }

  //切换上一首歌曲，根据sequence和index来判断
  const changePrevSong = () => {
    //如果歌单里面只有一首歌则直接重新播放
    if (playList.length === 1) {
      audioRef.current.currentTime = 0
      setCurrentTime(0)
      return
    }
    setCurrentTime(0)
    let newIndex = index
    if (sequence === 1) {
      newIndex = Math.floor(Math.random() * playList.length)
    } else {
      if ((newIndex - 1) < 0) {
        newIndex = playList.length - 1
      } else {
        newIndex = newIndex - 1
      }
    }
    dispatch(autoChangeSongAction(newIndex))
  }

  //自动监听歌曲播放时间和播放进度的函数
  const songPlayTime = (e) => {
    const targetTime = e.target.currentTime * 1000
    if (!isChange) {
      setCurrentTime(targetTime)
      setSongProgress(((currentTime / totalTime) || 0) * 100)
    }
    //根据播放时间，拿取歌词,注意这个时间不是currentTime，而是真正的播放时间
    lyricList.forEach((item, index) => {
      let prevTime = 0
      let nextTime = 0
      if (index > 0) {
        prevTime = lyricList[index - 1].time
        nextTime = item.time
      }
      if (targetTime >= prevTime && targetTime < nextTime) {
        //把获取到的歌词赋值给currentLyric,并且把时间保存到redux里面
        changeCurrentLyric(lyricList[index - 1] ? lyricList[index - 1].content : '')
        //并且把时间保存到redux里面
        console.log(prevTime)
        if (currentLyricTime !== prevTime) {
          dispatch(changeCurrentLyricAction(prevTime))
        }
      }
    })
  }

  //格式化后的时间
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
    if (isPlaying) {
      audioRef.current.play()
    }
  }, [totalTime, isPlaying])

  //根据state里面的sequence来点击切换循环方式
  const changeSequence = useCallback(() => {
    let num = sequence
    if (num === 2) {
      num = 0
    } else {
      num = num + 1
    }
    dispatch(getChangeSequenceAction(num))
  }, [sequence, dispatch])

  //播放完自动切换歌曲，这个和手动切换的区别在于单曲循环时不会切换到其他歌曲
  const autoChangeSong = () => {
    //如果是循环或者随机播放那就调用切下一首歌的方法就行
    if (sequence === 0 || sequence === 1) {
      changeNextSong()
    } else {
      //如果是单曲循环那么直接重新播放就行
      audioRef.current.play()
    }
  }

  //组件主要部分
  return (
    <PlayerBarWrapper className={'sprite_player'} >
      {/*歌词展示部分 */}
      {
        currentLyric ? <div className={'currentLyric'}><NavLink className={'content'} to='/discover/player'>{currentLyric}</NavLink></div> : ''
      }
      <div className={'content wrap-v2'}>
        {/**播放控制部分 */}
        <Control isPlaying={isPlaying}>
          <button className={'prev sprite_player'} onClick={() => { changePrevSong() }}></button>
          <button className={'play sprite_player'} onClick={() => { songPlayControl() }} ></button>
          <button className={'next sprite_player'} onClick={() => { changeNextSong() }}></button>
        </Control>

        {/**进度条部分 */}
        <PlayInfo>
          <div className={'image'}>
            <NavLink to='/discover/player'>
              <img src={getImgUrl(song.al?.picUrl, 35)} alt={'none'}></img>
            </NavLink>
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
        <Operator sequence={sequence}>
          <div className={''}>
            <button className={'sprite_player btn favor'}></button>
            <button className={'sprite_player btn share'}></button>
          </div>
          <div className={'right sprite_player'}>
            <button className={'sprite_player  btn volume'}></button>
            <button className={'sprite_player  btn loop'} onClick={changeSequence}></button>
            <button className={'sprite_player btn playlist'}></button>
          </div>
        </Operator>
      </div>
      <audio ref={audioRef}
        onTimeUpdate={(e) => { songPlayTime(e) }}
        onEnded={(e) => { autoChangeSong(e) }}
      ></audio>
    </PlayerBarWrapper>
  )
})
