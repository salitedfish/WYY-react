import { Redirect } from "react-router-dom"

//下面的基础路由
import GxkDiscover from "@/views/discover"
import GxkMine from "@/views/mine"
import GxkFriend from "@/views/friend"

//下面为discover的子路由
import GxkRecommend from "@/views/discover/c-views/recommend"
import GxkRanking from "@/views/discover/c-views/ranking"
import GxkSongs from "@/views/discover/c-views/songs"
import GxkDjradio from "@/views/discover/c-views/djradio"
import GxkSingers from "@/views/discover/c-views/singers"
import GxkAlbum from "@/views/discover/c-views/album"

const routes = [
  {
    path: '/',
    exact: true,
    render: () => {
      return <Redirect to="/discover"></Redirect>
    }
  },
  {
    path: '/discover',
    component: GxkDiscover,
    // 发现音乐里面还存在子路由，用routes来写，vue里面使用children
    routes: [
      {
        path: '/discover',
        exact: true,
        render: ()=>{
          return <Redirect to="/discover/recommend"></Redirect>
        },
      },
      {
        path: "/discover/recommend",
        component: GxkRecommend,
      },
      {
        path: "/discover/ranking",
        component: GxkRanking,
      },
      {
        path: "/discover/songs",
        component: GxkSongs,
      },
      {
        path: "/discover/djradio",
        component: GxkDjradio,
      },
      {
        path: "/discover/singers",
        component: GxkSingers,
      },
      {
        path: "/discover/album",
        component: GxkAlbum,
      },
    ]
  },
  {
    path: '/mine',
    component: GxkMine,
  },
  {
    path: '/friend',
    component: GxkFriend,
  },
];

export default routes
