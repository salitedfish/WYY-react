import React, { memo, useEffect, useRef } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'

//导入派发action的函数，因为用了redux-thunk，所以dispatch可以派发函数
import { getNewAction } from "../../store/actions"
import { AlbumCount } from "@/static/local-data.js"

//导入样式和功能组件
import GxkRcmThemeHeader from "@/components/theme-header-rcm"
import { AlbumWrapper } from "./style.js"
import { Carousel } from 'antd';
import GxkNewCover from "@/components/news-cover"

export default memo(function GxkNew() {

  //通过useSelector获取到store中的数据,并使用shallowEqual进行浅层比较
  const news = useSelector((store) => {
    return store.get('recommend').get('news')
  }, shallowEqual)

  //运用react-redux的hook获取到dispatch
  const dispatch = useDispatch()

  //运用react的hook，作用类似于类组件的生命周期函数
  useEffect(() => {
    dispatch(getNewAction(10))
  }, [dispatch])

  //设置分页的ref
  const pageRef = useRef()

  return (
    <AlbumWrapper>
      <GxkRcmThemeHeader title={'新碟上架'}></GxkRcmThemeHeader>
      <div className={'content'}>
        <div className={'arrow arrow-left sprite_02'}
          onClick={e => { pageRef.current.prev() }} />
        <div className={'album'}>
          {/*以下是新碟上架轮播图 */}
          <Carousel dots={false} ref={pageRef}>
            {
              //以下是遍历每一页轮播图
              [0, 1].map((item, index) => {
                return (
                  <div key={item} className={'page'}>
                    {
                      //以下是每页轮播图分别遍历不同的数据
                      news.slice(item * AlbumCount, (item + 1) * AlbumCount).map((iten, index) => {
                        return (
                          <GxkNewCover key={iten.id}
                            data={iten}
                            size={100}
                            width={118}
                            bgp={'-570px'}/>
                        )
                      })
                    }
                  </div>
                )
              })
            }
          </Carousel>
        </div>
        <div className={'arrow arrow-right sprite_02'}
          onClick={e => { pageRef.current.next() }} />
        <div></div>
      </div>
    </AlbumWrapper>
  )
})
