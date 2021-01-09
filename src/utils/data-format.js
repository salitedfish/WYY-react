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
  if (!url) return
  if (url.indexOf('?') < 0) {
    return `${url}?param=${size}x${size}`
  } else {
    return `${url}&param=${size}x${size}`
  }
}

//这个是时间格式化函数
export function getData(time, fmt) {
  let date = new Date(time);

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
};

//这个是拼接播放歌曲链接的函数
export const getPlaySong = (url, id) => {
  return url + '?id=' + id + '.mp3'
}
