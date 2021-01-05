import styled from 'styled-components';

//整个轮播图区域
export const BannerWrapper = styled.div`
  background: url(${props => props.bgimage}) center/6000px;

  .banner {
    height: 270px;
    background-color: red;
    display: flex;
    position: relative;
  }
`
//轮播图左边区域
export const BannerLeft = styled.div`
  width: 730px;

  .banner-item {
    overflow: hidden;
    height: 270px;
    img {
      width: 100%;
    }
  }
  .slick-dots li {
    text-align: center;
    width: 10px;
    margin: 0 10px 5px 0;
  }
  .slick-dots li button {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    &:hover {
      background-color: red;
    }
  }
  .ant-carousel .slick-dots .slick-active {
    width: 10px;
    button {
      background-color: red;
    }
  }
`

//轮播图右边区域
export const BannerRight = styled.a.attrs({
  href: "https://music.163.com/#/download",
  target: "_blank"
})`
  width: 254px;
  height: 270px;
  background: url(${require("@/assets/img/download.png").default});
`

//轮播图左右两个控制键
export const BannerControl = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

  .btn {
    position: absolute;
    width: 37px;
    height: 63px;
    background-image: url(${require("@/assets/img/banner_sprite.png").default});
    background-color: transparent;
    cursor: pointer;

    &:hover {
      background-color: rgba(0, 0, 0, .1);
    }
  }

  .left {
    left: -68px;
    background-position: 0 -360px;
  }

  .right {
    right: -68px;
    background-position: 0 -508px;
  }
`
