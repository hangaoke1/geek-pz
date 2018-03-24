import API from '@service/api';
import store from 'store';
import _ from 'lodash';
import { call, put, takeEvery } from 'redux-saga/effects';
import { message } from 'antd';
import { browserHistory } from 'react-router';
const URL = {
  // loginUrl: 'http://server.api-mocker.com/client/5aae62fd18e20f7ba1e9d5fc',
  // getUserInfoUrl: 'http://server.api-mocker.com/client/5aae63dddde3a27b97aafe9e',
  // isLoginUrl: 'http://server.api-mocker.com/client/5aae6f49a989de7badbe19ac'
  loginUrl: '/login',
  getUserInfoUrl: '/getUserInfo',
  isLoginUrl: '/isLogin'
};
// 登陆
const LOGIN_ASYNC = 'LOGIN_ASYNC';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_ERROR = 'LOGIN_ERROR';
// 获取用户信息
const GETUSERINFO_ASYNC = 'GETUSERINFO_ASYNC';
const GETUSERINFO_SUCCESS = 'GETUSERINFO_SUCCESS';
const GETUSERINFO_ERROR = 'GETUSERINFO_ERROR';
// 用户退出
const LOGOUT = 'LOGOUT';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
// action
function loginAction(data) {
  return {
    type: LOGIN_ASYNC,
    account: data
  };
}

function logoutAction(data) {
  return {
    type: LOGOUT
  };
}

function getUserInfoAction(data) {
  return {
    type: GETUSERINFO_ASYNC,
    account: data
  };
}

function registerAcition(data) {
  return API.post('/register', data);
}

function isLogin() {
  return API.get(URL.isLoginUrl).then(res => res.data).catch(err => {
    return Promise.reject(err);
  });
}

// worker saga
function* loginSaga(action) {
  const userInfo = yield call(function() {
    return API.post(URL.loginUrl, action.account).then(function(res) {
      return res.data;
    }).catch(error => {
      return { error };
    });
  });
  if (userInfo.code === 0) {
    store.set('login', 1);
    yield put({
      type: LOGIN_SUCCESS,
      data: userInfo.data
    });
    browserHistory.push('/dashboard');
  } else {
    message.error(userInfo.message);
    yield put({
      type: LOGIN_ERROR,
      data:null
    });
  }
}

function* getUserInfoSaga(action) {
  const userInfo = yield call(function() {
    return API.post(URL.getUserInfoUrl).then((res) => {
      return res.data;
    }).catch(error => {
      return { error };
    });
  });
  if (userInfo.code === 0) {
    yield put({
      type: GETUSERINFO_SUCCESS,
      data: userInfo.data
    });
  } else {
    yield put({
      type: GETUSERINFO_ERROR,
      data: null
    });
  }
}

function* logoutSaga() {
  store.set('login', 0);
  yield put({
    type: LOGOUT_SUCCESS
  });
  browserHistory.push('/login');
}

// reducer
var defaultState = {
  requesting: false,
  requestingInfo: false,
  userInfo: {}
};

function user(state = _.cloneDeep(defaultState), action) {
  switch (action.type) {
  case LOGIN_ASYNC:
    return {
      ...state,
      requesting: true,
    };
  case LOGIN_SUCCESS:
    return {
      ...state,
      requesting: false
    };
  case LOGIN_ERROR:
    return {
      ...state,
      requesting: false
    };
  case GETUSERINFO_ASYNC:
    return {
      ...state,
      requestingInfo: true
    };
  case GETUSERINFO_SUCCESS:
    return {
      ...state,
      requestingInfo: false,
      userInfo: action.data
    };
  case GETUSERINFO_ERROR:
    return {
      ...state,
      requestingInfo: false
    };
  case LOGOUT_SUCCESS:
    return _.cloneDeep(defaultState);
  default:
    return state;
  }
}

// watch saga
export const userSaga = function* () {
  yield takeEvery(LOGIN_ASYNC, loginSaga);
  yield takeEvery(GETUSERINFO_ASYNC, getUserInfoSaga);
  yield takeEvery(LOGOUT, logoutSaga);
};

export const userReducer = user;
 
export const userAction = {
  login: loginAction,
  logout: logoutAction,
  register: registerAcition,
  isLogin,
  getUserInfo: getUserInfoAction
};

export default {
  userSaga,
  userReducer,
  userAction
};
