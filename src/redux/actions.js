/*
  返回action函数的模块
    同步action：返回的是对象 {type: '', data: ''}
    异步action：返回的是函数 dispatch => {}
*/

import {
    SET_HEAD_TITLE,
} from './action-types';
/*
   设置头部title的action
*/
export const setHeadTitle = (headTitle) => ({
    type: SET_HEAD_TITLE,
    data: headTitle
});
