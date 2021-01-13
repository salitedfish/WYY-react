import React, { memo, useEffect, useState } from 'react'
import { useSelector } from "react-redux"

import { PlayerWrapper, PlayerLeft, PlayerRight } from "./style.js"

export default memo(function GxkPlayer() {

  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAll, setShowAll] = useState(false)

  //通过redux拿到实时的歌词
  const currentLyricTime = useSelector((state) => {
    return state.get('player').get('currentLyricTime')
  })
  const lyricList = useSelector((state) => {
    return state.get('player').get('lyricList')
  })

  useEffect(() => {
    lyricList.forEach((item, index) => {
      if (item.time === currentLyricTime) {
        setCurrentIndex(index)
      }
    })

  }, [lyricList, currentLyricTime])

  const changeShowAll = () => {
    setShowAll(!showAll)
  }

  return (
    <PlayerWrapper>
      <div className={'content wrap-v2'}>
        <PlayerLeft showAll={showAll}>
          <div>
            {
              showAll ? (
                lyricList?.map((item, index) => {
                  return (
                    <div key={item.content + item.time}
                      className={index === currentIndex ? 'red' : 'black'}>
                      {item.content}
                    </div>
                  )
                })
              ) : (
                  lyricList?.slice(0, 10).map((item, index) => {
                    return (
                      <div key={item.content + item.time}
                        className={index === currentIndex ? 'red' : 'black'}>
                        {item.content}
                      </div>
                    )
                  })
                )
            }
          </div>
          <button onClick={changeShowAll}>
            {
              showAll ? '收起' : '展开'
            }
          </button>
          <div className={'jiantou'}>{'>>'}</div>
        </PlayerLeft>
        <PlayerRight>
          <h2>player right</h2>
        </PlayerRight>
      </div>
    </PlayerWrapper>
  )
})
