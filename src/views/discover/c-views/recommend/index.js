import React, { memo } from 'react'

//导入样式组件及子组件
import { RecommendWrapper, Content, RecommendLeft, RecommendRight } from "./style.js"
import GxkBanner from "./recom-cpn/banner"
import GxkHot from "./recom-cpn/hot"
import GxkNew from "./recom-cpn/new"
import GxkRcmRanking from "./recom-cpn/rcm-ranking"
import GxkHotRadio from "./recom-cpn/hot-radio"
import GxkSettleSinger from "./recom-cpn/settle-singer"
import GxkUserLogin from "./recom-cpn/user-login"

// 定义GxkRecommend组件
function GxkRecommend() {

  return (
    <RecommendWrapper>
      {/*以下是轮播图 */}
      <GxkBanner></GxkBanner>

      <Content className="wrap-v2">

        <RecommendLeft>
          <GxkHot></GxkHot>
          <GxkNew></GxkNew>
          <GxkRcmRanking></GxkRcmRanking>
        </RecommendLeft>

        <RecommendRight>
          <GxkUserLogin></GxkUserLogin>
          <GxkSettleSinger></GxkSettleSinger>
          <GxkHotRadio></GxkHotRadio>
        </RecommendRight>

      </Content>
    </RecommendWrapper>
  )

}

export default memo(GxkRecommend)



//定义GxkRecommend组件
// function GxkRecommend(props) {
//   const { getBanners, topBanners } = props

//   useEffect(() => {
//     getBanners()
//   }, [getBanners])

//   return (
//     <div>
//       {topBanners.length}
//     </div>
//   )
// }

// const mapStateToProps = store => {
//   return {
//     topBanners: store.recommend.topBanners
//   }
// }
// const mapDispatchToProps = dispatch => {
//   return {
//     getBanners() {
//       dispatch(getTopBannerAction())
//     }
//   }
// }

//导出由connect和memo处理后的组件
// export default connect(mapStateToProps, mapDispatchToProps)(memo(GxkRecommend))
