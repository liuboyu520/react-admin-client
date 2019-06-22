
/*
* 根据接口文档定义接口请求的函数模块
*   包含应用中所有接口请求函数的模块
*   每个函数的返回值都是promise
*
*/

import ajax from './ajax';
import jsonp from 'jsonp';

import { message } from 'antd';

//用户登录
export const reqLogin = (username, password) => ajax('/login', { username, password }, 'POST');

//请求天气预报信息(jsonp)
export const reqWeather = (city) => {
    return new Promise((resolve, reject) => {
        //请求天气的url
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;

        jsonp(url, {}, (err, data) => {

            if(!err){ //请求成功

                const { dayPictureUrl, weather } = data.results[0].weather_data[0];
                resolve({
                    dayPictureUrl: dayPictureUrl,
                    weather: weather
                });
            }else {
                //提示错误信息
                message.error('天气信息无法获取');
            }
        });

    });
};

//获取分类数据
export const reqCategorys = (parentId) => ajax('/manage/category/list', {parentId});



