import styled from "styled-components"

export const HeaderWrapper = styled.div`
  height: 75px;
  background-color: #242424;
  .header-content {
    height: 70px;
    display: flex;
    justify-content: space-between;
    .content-left {
      display: flex;
      .left-logo {
        width: 176px;
        height: 69px;
        background-position: 0 0;
      }
      .select-list {
        display: flex;
        .select-item {
          display: block;
          padding: 0 19px;
          font-size: 14px;
          line-height: 70px;
          cursor: pointer;
          color: #fff;
          text-decoration: none;
          &:hover {
          background-color: #000;      
        }

        }
        .active {
          position: relative;
          background-color: #000;
          .icon {
            position: absolute;
            width: 20px;
            height: 19px;
            background: url(${require("@/assets/img/sprite_01.png")});
            background-position: -221px 9px;
            top: 100%;
            right: 50%;
            margin-top: -15px;
            margin-right: -10px;
            z-index: 100;
          }
        }
      }
    }
    .content-right {
      display: flex;
      .right-search {
        width: 158px;
        height: 32px;
        border-radius: 20px;
        margin-top: 20px;
        font-size: 12px;
      }
      .user-center {
        width: 90px;
        height: 32px;
        margin: 19px 0 0 12px;
        box-sizing: border-box;
        padding-left: 16px;
        border: 1px solid #4F4F4F;
        background-position: 0 -140px;
        line-height: 33px;
        color: #ccc;
        border-radius: 20px;
        cursor: pointer;
        &:hover {
          border: 1px solid #fff;
          color: #fff;
        }
      }
      .login {
        width: 28px;
        height: 16px;
        color: #787878;
        cursor: pointer;
        margin: 27px 15px 0 15px;
      }
    }
  }
  .divider {
    height: 5px;
    background-color: #c20c0c;
  }
`

