import { getSong } from "@/network/getSong.js"

import { GETSONG, CHANGE_SONG_INDEX, CHANGE_PLAY_LIST, CHNAGE_SEQUENCE } from './static'

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

// const changeSequenceAction = (num) => {
//   return {
//     type: CHNAGE_SEQUENCE,
//     sequence: num
//   }
// }


//下面是提供给目标组件的派发action的函数，因为用了redux-thunk所以可以传入函数，并发送网络请求
export const getSongAction = (ids) => {
  return (dispatch, getState) => {
    //根据ids查找原来的playList里面歌曲的index
    const playList = getState().get('player').get('playList')
    const songIndex = playList.findIndex((song) => { return song.id === ids })

    //判断原来的playList里面有没有找到歌曲
    if (songIndex !== -1) {
      //如果找到歌曲，就改变store里面当前播放歌曲的索引，并把歌曲派发给store里面的当前播放歌曲
      dispatch(changeCurrentSongIndexAction(songIndex))
      const song = playList[songIndex]
      dispatch(changeSongAction(song))
    } else {
      //如果没找到歌曲,那就要重新请求数据,并且播放列表，当前播放歌曲，当前播放歌曲索引都要重新设置
      getSong(ids).then((res) => {
        const song = res.songs?.[0]
        if (!song) return;

        const newPlayList = [...playList]
        newPlayList.push(song)

        dispatch(changePlayListAction(newPlayList))
        dispatch(changeCurrentSongIndexAction(newPlayList.length - 1))
        dispatch(changeSongAction(song))
      })
    }
  }
}

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
  }
}

export const getChangeSequenceAction = (sequence) => {
  return {
    type: CHNAGE_SEQUENCE,
    sequence
  }
}
