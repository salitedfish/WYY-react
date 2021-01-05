import myAxios from "./myAxios"

export function getTopBanners(){
  return myAxios({
    url: '/banner'
  })
}