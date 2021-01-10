import React, { memo } from 'react'

import { PlayerWrapper, PlayerLeft, PlayerRight } from "./style.js"

export default memo(function GxkPlayer() {
  return (
    <PlayerWrapper>
      <div className={'content wrap-v2'}>
        <PlayerLeft>
          <h2>player left</h2>
        </PlayerLeft>
        <PlayerRight>
          <h2>player right</h2>
        </PlayerRight>
      </div>
    </PlayerWrapper>
  )
})
