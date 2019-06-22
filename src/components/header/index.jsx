import React, { Component } from 'react';
import './index.less';

import { formateDate } from '../../utils/dateUtils';

//导入天气信息查询接口
import {reqWeather} from '../../api';

//引入内存模块
import memoryUtils from '../../utils/memoryUtils';

/**
 * 管理页面头部
 */
export default class Header extends Component {


    state = {
        currentTime: formateDate(Date.now()), //当前时间
        dayPictureUrl: '', //天气图片url
        weather: '' //天气信息
    }

    getTime = ()=>{
        //实时更新当前时间
        this.timerId = setInterval(()=>{
            this.setState({
                currentTime: formateDate(Date.now())
            });
        },1000);
    };

    getWeather = async (city) => {

        const { dayPictureUrl, weather } = await reqWeather(city);

        //设置state
        this.setState({
            dayPictureUrl,
            weather
        });

    }

    //组件渲染完成时
    componentWillMount() {

        //更新当前时间
        this.getTime();

        //请求天气预报信息
        this.getWeather('北京');

    }

    //清除定时器
    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    render(){

        //获取当前登录的用户
        let loginUser = memoryUtils.user;
        if(!loginUser || !loginUser.name){
            loginUser = {};
        }

        //页面需要显示的信息
        const { currentTime, dayPictureUrl, weather } = this.state;
        return (
            <div className="header">
                <div className="header-top">
                    <span>hello, { loginUser.name }</span>
                    <a href="javascript;">退出</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        <span>首页</span>
                    </div>
                    <div className="header-bottom-right">
                        <span>{ currentTime }</span>
                        <img src={ dayPictureUrl } alt="weather"/>
                        <span>{ weather }</span>
                    </div>
                </div>
            </div>
        )
    }
}
