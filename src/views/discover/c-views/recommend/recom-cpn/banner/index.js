import React, { memo, useEffect, useRef, useCallback, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from "react-redux"

//导入获得banner数据的action
import { getTopBannerAction } from '../../store/actions'

//导入所有相关组件
import { BannerWrapper, BannerLeft, BannerRight, BannerControl } from "./style.js"
import { Carousel } from 'antd';



//定义轮播图组件
function GxkBanner() {

  //设置轮播图的索引值
  const [currentIndex, setCurrentIndex] = useState(0)

  //通过useDispatch获得dispatch函数
  const dispatch = useDispatch()

  //通过useSelector获得store相关数据
  const topBanners = useSelector(state => {
    return state.getIn(['recommend', 'topBanners'])
  }, shallowEqual)

  //调用useEffect调用组件相关函数
  useEffect(() => {
    dispatch(getTopBannerAction())
  }, [dispatch])

  //定义banner的ref，以便后续按钮可以获取
  const bannerRef = useRef()

  //一旦轮播图切换，就设置currentIndex的值
  const bannerChange = useCallback((from, to) => {
    setCurrentIndex(to)
  }, [])

  //拼接具有高斯模糊的背景图片地址
  let bgImage = topBanners[currentIndex] && topBanners[currentIndex].imageUrl
  if (bgImage?.indexOf('?imageView&blur=40x20') === -1) {
    bgImage = topBanners[currentIndex] && topBanners[currentIndex].imageUrl + "?imageView&blur=40x20"
  }

  return (
    <BannerWrapper bgimage={bgImage}>
      <div className="banner wrap-v2" >
        <BannerLeft>
          {/*以下为轮播图*/}
          <Carousel effect="fade" ref={bannerRef} beforeChange={bannerChange} autoplay="true">
            {
              topBanners.map((item) => {
                return (
                  <div key={item.encodeId} className={'banner-item'}>
                    <img src={item.imageUrl} alt={item.scm}></img>
                  </div>
                )
              })
            }
          </Carousel>
        </BannerLeft>
        {/*以下为下载客户端图片 */}
        <BannerRight></BannerRight>
        {/*以下为左右切换按钮 */}
        <BannerControl>
          <div className='btn left' onClick={() => { bannerRef.current.prev() }}></div>
          <div className='btn right' onClick={() => { bannerRef.current.next() }}></div>
        </BannerControl>
      </div>
    </BannerWrapper>
  )
}

//导出memo处理后的轮播图组件
export default memo(GxkBanner)
