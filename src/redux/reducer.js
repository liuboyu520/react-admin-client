/*
  根据旧的state和指定的action生成新的state的函数
*/
import localStorage from '../utils/localStorage';
import { combineReducers } from 'redux';
import {
    SET_HEAD_TITLE,
} from './action-types';

//用来管理头部title的reducer函数
const initHeadTile = '首页';
function headTitle (state=initHeadTile, action) {
    switch (action.type) {
        case SET_HEAD_TITLE:
            return action.data;
        default:
            return state;
    }
}

//用来管理当前登录用户的reducer函数
const initUser = localStorage.getUser();
function user (state=initUser, action) {
    switch (action.type) {
        default:
            return state;
    }
}

/*
向外默认暴露的是合并产生的总的reducer函数
管理的总的state的结构:
  {
    headTitle: '首页',
    user: {}
  }
 */
export default combineReducers({
    headTitle,
    user
});

