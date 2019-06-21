
/*
* 根据接口文档定义接口请求的函数模块
*   包含应用中所有接口请求函数的模块
*   每个函数的返回值都是promise
*
*/

import ajax from './ajax';

//用户登录
export const reqLogin = (username, password) => ajax('/login', { username, password }, 'POST');

