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

    /**
     * 根据菜单数组生成对应的标签数组：
     *      通过数组的map()和递归算法实现
     */
    getMenuNodes_ = (menuList) => {
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

    //使用数组的reduce()和递归算法实现
    getMenuNodes = (menuList) => {

        return menuList.reduce((prev, item) => {
            if(!item.children){
                prev.push(
                    (
                        <Menu.Item key={item.key}>
                            <Link to={item.key}>
                                <Icon type={item.icon}/>
                                <span>{item.title}</span>
                            </Link>
                        </Menu.Item>
                    )
                );
            }else {
                prev.push(
                    (
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
                );
            }
            return prev;
        },[]);
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
