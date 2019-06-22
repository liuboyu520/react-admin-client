import React, { Component } from 'react';
import { Modal } from 'antd';
import { withRouter } from 'react-router-dom';

import './index.less';

import { formateDate } from '../../utils/dateUtils';

//导入天气信息查询接口
import {reqWeather} from '../../api';

//引入内存模块
import memoryUtils from '../../utils/memoryUtils';
import localStorage from '../../utils/localStorage';

//引入菜单数据
import menuList from '../../config/menuConfig';

//引入自定义Button
import LinkButton from '../../components/link-button';

/**
 * 管理页面头部
 */
class Header extends Component {

    //状态数据
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

    };

    //获取当前显示的标题
    getTitle = () => {
        //获取当前访问的path
        const path = this.props.location.pathname;

        let title = '';
        //遍历查找当前显示的菜单title
        menuList.forEach(item =>{
            if(item.key === path){
                 title = item.title;
            }else if(item.children){
                const cItem = item.children.find(cItem => cItem.key === path);
                if(cItem){
                    title = cItem.title;
                }
            }
        });
        return title;
    };

    //退出登录
    logout = () => {

        //弹出退出登录提示框
        Modal.confirm({
            title: '确认退出?',
            onOk: () => { //确认时执行的回调函数,因为涉及this指向的问题,改为箭头函数

                //清除用户登录信息
                memoryUtils.user = {};
                localStorage.removeUser();

                //跳转到用户登录页面
                this.props.history.replace('/login');

            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    //组件渲染完成时
    componentWillMount() {

        //更新当前时间
        //TODO：定时器的执行会导致一直渲染组件
        this.getTime();

        //请求天气预报信息
        this.getWeather('北京');

    }

    //清除定时器
    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    //渲染组件
    render(){

        //获取当前登录的用户
        let loginUser = memoryUtils.user;
        if(!loginUser || !loginUser.username){
            loginUser = {};
        }

        //页面需要显示的信息
        const { currentTime, dayPictureUrl, weather } = this.state;

        //获取当前显示的title
        const title = this.getTitle();
        return (
            <div className="header">
                <div className="header-top">
                    <span>您好, { loginUser.username }</span>
                    {/* 自定义button组件 */}
                    <LinkButton onClick={this.logout}>退出</LinkButton>
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

export default withRouter(Header);
