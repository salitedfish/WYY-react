//这个函数是对数量进行一个格式化
export function getCount(count) {
  if (count > 100000000) {
    return Math.floor(count / 10000000) / 10 + '亿'
  } else if (count > 100000) {
    return Math.floor(count / 1000) / 10 + '万'
  }
  return count
}

//这个函数是对图片的url进行格式化，对请求的图片大小进行一个限制
export function getImgUrl(url, size = 140) {
  if (url.indexOf('?') < 0) {
    return `${url}?param=${size}x${size}`
  } else {
    return `${url}&param=${size}x${size}`
  }
}