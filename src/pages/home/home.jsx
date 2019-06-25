import React, { Component } from 'react';

//引入样式文件
import './home.less';

/**
 * 首页路由
 */
export default class Home extends Component {

    render(){

        return (
            <div className="home">
                <span>欢迎登录硅谷后台系统</span>
            </div>
        )
    }
}
