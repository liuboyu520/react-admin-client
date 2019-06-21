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

    getMenuNodes = (menuList) => {
        return menuList.map(item => {
            console.log(item)
            if(!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon}/>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }else {
                return (
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon}/>
                                <span>{item.title}</span>
                             </span>
                        }
                    >

                        {
                            this.getMenuNodes(item.children)
                        }
                    </SubMenu>
                )
            }

        });
    };

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
                    {/* 菜单动态加载 */}
                    {
                        this.getMenuNodes(menuList)
                    }
                </Menu>
            </div>
        )
    }
}
