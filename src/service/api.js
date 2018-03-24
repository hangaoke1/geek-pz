import axios from 'axios';
import { browserHistory } from 'react-router';
import store from 'store';
const API = axios.create({
  baseURL: 'http://192.168.1.102:8080/api',
  withCredentials: true
});

API.interceptors.response.use(function (response) {
  // 登陆状态拦截
  var res = response.data;
  if (res.code === 400) {
    store.set('login', 0);
    browserHistory.push('/login');
  }
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});

export default API;
