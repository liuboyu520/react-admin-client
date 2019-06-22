import React, { Component } from 'react';
import './index.less';

/**
 * 管理页面头部
 */
export default class Header extends Component {

    render(){

        return (
            <div className="header">
                <div className="header-top">
                    <span>hello, admin</span>
                    <a href="javascript;">退出</a>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">
                        <span>首页</span>
                    </div>
                    <div className="header-bottom-right">
                        <span>2019年6月22日9:10</span>
                        <img src="" alt=""/>
                        <span>晴</span>
                    </div>
                </div>
            </div>
        )
    }
}
