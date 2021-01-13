import {
  getSong,
  getSongWords
} from "@/network/getSong.js"

import {
  GETSONG,
  CHANGE_SONG_INDEX,
  CHANGE_PLAY_LIST,
  CHNAGE_SEQUENCE,
  CHANGE_ISPLAYING,
  CHANGE_SONGWORDS,
  CHANGE_CURRENTLYRIC
} from './static'

import { parseLyric } from "@/utils/lyric-parse.js"

//下面是真正要派发的action
const changeSongAction = (currentSong) => {
  return {
    type: GETSONG,
    currentSong
  }
}

const changePlayListAction = (playList) => {
  return {
    type: CHANGE_PLAY_LIST,
    playList: playList
  }
}

const changeCurrentSongIndexAction = (index) => {
  return {
    type: CHANGE_SONG_INDEX,
    currentSongIndex: index
  }
}


//下面是提供给目标组件的派发action的函数，因为用了redux-thunk所以可以传入函数，并发送网络请求
export const getSongAction = (ids = 167876) => {
  return (dispatch, getState) => {
    //根据ids查找原来的playList里面歌曲的index
    const playList = getState().get('player').get('playList')
    const songIndex = playList.findIndex((song) => { return song.id === ids })
    let song = null
    //判断原来的playList里面有没有找到歌曲
    if (songIndex !== -1) {
      //如果找到歌曲，就改变store里面当前播放歌曲的索引，并把歌曲派发给store里面的当前播放歌曲
      dispatch(changeCurrentSongIndexAction(songIndex))
      song = playList[songIndex]
      dispatch(changeSongAction(song))
      //每一个播放歌曲都要请求歌词
      dispatch(getSongWordsAction(song?.id))
    } else {
      //如果没找到歌曲,那就要重新请求数据,并且播放列表，当前播放歌曲，当前播放歌曲索引都要重新设置
      getSong(ids).then((res) => {
        song = res.songs?.[0]
        if (!song) return;
        const newPlayList = [...playList]
        newPlayList.push(song)
        dispatch(changePlayListAction(newPlayList))
        dispatch(changeCurrentSongIndexAction(newPlayList.length - 1))
        dispatch(changeSongAction(song))
        //每一个播放歌曲都要请求歌词
        dispatch(getSongWordsAction(song?.id))
      })
    }

  }
}

//将歌曲添加到播放列表的action，但是不会播放，因此不会改变播放的歌曲
export const addSongAction = (ids) => {
  return (dispatch, getState) => {
    //根据ids查找原来的playList里面歌曲的index
    const playList = getState().get('player').get('playList')
    const songIndex = playList.findIndex((song) => { return song.id === ids })
    //判断原来的playList里面有没有找到歌曲
    if (songIndex !== -1) {
      return
    } else {
      //如果没找到歌曲,那就要重新请求数据,并且播放列表重新设置
      getSong(ids).then((res) => {
        const song = res.songs?.[0]
        if (!song) return;
        const newPlayList = [...playList]
        newPlayList.push(song)
        dispatch(changePlayListAction(newPlayList))
      })
    }
  }
}

//这个只是根据index来改变currentSong
export const autoChangeSongAction = (index) => {
  return (dispatch, getState) => {
    const playList = getState().get('player').get('playList')
    const newSong = playList[index]
    dispatch(changeCurrentSongIndexAction(index))
    dispatch(changeSongAction(newSong))
    //每一个播放歌曲都要请求歌词
    dispatch(getSongWordsAction(newSong?.id))
  }
}

//更改循环方式的action
export const getChangeSequenceAction = (sequence) => {
  return {
    type: CHNAGE_SEQUENCE,
    sequence
  }
}

//更改播放状态的action
export const changeIsplaying = (type) => {
  return {
    type: CHANGE_ISPLAYING,
    isPlaying: type
  }
}

//根据id获取歌词的action
export const getSongWordsAction = (id) => {
  return (dispatch) => {
    getSongWords(id).then((res) => {
      //对获取到的歌词进行解析成一个数组
      const lyricList = parseLyric(res.lrc.lyric)
      dispatch({
        type: CHANGE_SONGWORDS,
        lyricList
      })
    })
  }
}

//将播放到的歌词的时间保存到redux里面
export const changeCurrentLyricAction = (currentLyricTime) => {
  return {
    type: CHANGE_CURRENTLYRIC,
    currentLyricTime
  }
}