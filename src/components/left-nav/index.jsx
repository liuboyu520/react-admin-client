import React, {Component} from 'react';
import {Link} from 'react-router-dom';

//引入antd组件
import {Menu, Icon} from 'antd';

//引入图片
import logo from '../../assets/images/logo.png';

import './index.less';

//引入菜单数据
import menuList from '../../config/menuConfig';

const {SubMenu} = Menu;

/**
 * 左侧菜单
 */
export default class LeftNav extends Component {

    render() {

        return (
            <div className="left-nav">
                <Link to="/" className="left-nav-header">
                    <img src={logo} alt="logo"/>
                    <h2>硅谷后台</h2>
                </Link>
                <Menu
                    mode="inline"
                    theme="dark">

                    {/* 一级菜单：首页 */}
                    <Menu.Item >
                        <Icon type="home"/>
                        <span>首页</span>
                    </Menu.Item>

                    {/* 一级菜单：商品 */}
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <Icon type="appstore"/>
                                <span>商品</span>
                             </span>
                        }
                    >
                        <Menu.Item key="2">
                            <Icon type="bars"/>
                            <span>品类管理</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="tool"/>
                            <span>商品管理</span>
                        </Menu.Item>
                    </SubMenu>

                    {/* 一级菜单：用户管理 */}
                    <SubMenu
                        key="sub2"
                        title={
                            <span>
                                <Icon type="user"/>
                                <span>用户管理</span>
                             </span>
                        }
                    >
                        <Menu.Item key="4">用户管理1</Menu.Item>
                        <Menu.Item key="5">用户管理2</Menu.Item>
                    </SubMenu>

                    {/* 一级菜单：角色管理 */}
                    <SubMenu
                        key="sub3"
                        title={
                            <span>
                                <Icon type="team"/>
                                <span>角色管理</span>
                             </span>
                        }
                    >
                        <Menu.Item key="6">角色管理1</Menu.Item>
                        <Menu.Item key="7">角色管理2</Menu.Item>
                    </SubMenu>

                    {/* 一级菜单：图形图表 */}
                    <SubMenu
                        key="sub4"
                        title={
                            <span>
                                <Icon type="bar-chart"/>
                                <span>图形图表</span>
                             </span>
                        }
                    >
                        <Menu.Item key="8">图形图表1</Menu.Item>
                        <Menu.Item key="9">图形图表2</Menu.Item>
                    </SubMenu>

                </Menu>
            </div>
        )
    }
}
