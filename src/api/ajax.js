/*
   通过axios库发送异步ajax请求的函数模块：
    封装axios库
    函数的返回值是promise对象
 */

import axios from 'axios';
import {message} from "antd";

export default function (url, data = {}, method = 'GET') {

    return new Promise((resolve, reject) => {

        let promise;

        //1.执行异步ajax请求
        if (method === 'GET') { //GET请求
            promise = axios.get(url, { //配置对象
                params: data //指定请求参数
            });
        } else if (method === 'POST') { //POST请求
            promise = axios.post(url, data);
        }

        //2.异步请求成功,执行resolve(value)
        promise.then(response => {
            resolve(response.data); //请求成功响应的数据
        }).catch(err => {

            //3.异步请求失败,不执行reject(reason),而是提示错误信息
            message.error('请求出错了！' + err.message);
        });

    });
}