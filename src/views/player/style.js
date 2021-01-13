import styled from "styled-components"

export const PlayerWrapper = styled.div`
  .content {
    background: url(${require("@/assets/img/wrap-bg.png").default}) repeat-y;
    background-color: #fff;
    display: flex;
  }
`

export const PlayerLeft = styled.div`
  width: 710px;
  text-align: center;
  button {
    cursor:pointer;
  }
  .jiantou {
    display: inline-block;
    transform: ${(props)=>{return props.showAll?'rotateZ(-90deg)':'rotateZ(90deg)'}};
  }
  .red {
    color: red;
  }
`

export const PlayerRight = styled.div`
  width: 270px;
  padding: 20px 40px 40px 30px;
`
