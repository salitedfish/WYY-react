import axios from 'axios'
import { BASE_URL, TIMEOUT } from "./config"

//创建一个新的axios实例，赋值给myAxios
const myAxios = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
})

//给myAxios添加响应拦截器,并返回res.data,错误则返回err
myAxios.interceptors.response.use((res) => {
  return res.data
}, (err) => {
  return err
})

//导出封装好的axios实例
export default myAxios
