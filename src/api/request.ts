import { getToken } from '@/utils/token';
import { Message } from '@arco-design/web-react';
import axios from 'axios';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
const instance = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 5000,
})
instance.interceptors.request.use(req => {
  console.log('before', req)
  const token = getToken()
  if (token) req.headers.token = token;
  return req;
})
instance.interceptors.response.use(req => {
  if (!req.data?.success) {
    let message = req.data?.message || '未知错误';
    const match = message.match(/Duplicate entry (.*?) /)?.[1]
    console.log('mt', match)
    if (match) message = `${match} is used`
    Message.error(message)
    return Promise.reject(message)
  }
  return req.data;
}, err => {
  console.dir(err)
  Message.error('未知错误')
  // if (error.response.status === 401) {
  //   // 无效的 token
  //   // 把 Vuex 中的 token 重置为空，并跳转到登录页面
  //   // 1.清空token
  //   store.commit('updateToken', '')
  //   // 2.跳转登录页
  //   router.push('/login')
  // }
  return Promise.reject(err);
})
const request = {
  get: (url, params) => instance({ url, params, method: 'get', maxRedirects: 0 }),
  post: (url, data) => instance({ url, data, method: 'post', maxRedirects: 0 }),
}
export default request;