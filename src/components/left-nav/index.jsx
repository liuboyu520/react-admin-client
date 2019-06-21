import React, {Component} from 'react';
import {Link, withRouter } from 'react-router-dom';

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
class LeftNav extends Component {

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

        //获取当前请求的路径
        const pathName = this.props.location.pathname;
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

                //查找当前请求路径对应选中的子列表(选中的子菜单在刷新页面的情况下处于展开状态)
                const result = item.children.find(childItem => childItem.key === pathName);
                if(result){ //匹配成功
                    this.selectKey = item.key; //将当前匹配子菜单的父级菜单key保存在组件实例对象的selectKey属性中
                }
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

    //在组件render()前执行,只执行一次,在此生命周期函数中动态加载菜单数据,效率高(优化)
    componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList);
    }

    render() {

        //获取当前请求的路径名称(添加到defaultSelectedKeys属性中,实现请求的路径与菜单的选中状态进行同步)
        const pathName = this.props.location.pathname;

        //得到当前需要打开菜单的key
        const selectKey = this.selectKey;
        return (
            <div className="left-nav">
                <Link to="/" className="left-nav-header">
                    <img src={logo} alt="logo"/>
                    <h2>硅谷后台</h2>
                </Link>
                <Menu
                    defaultSelectedKeys={[pathName]}
                    defaultOpenKeys={[selectKey]}
                    mode="inline"
                    theme="dark">
                    {/* 菜单动态加载 */}
                    {
                        this.menuNodes
                    }
                </Menu>
            </div>
        )
    }
}

/**
 * withRouter()：高阶组件
 *      包装非路由组件,返回一个新的组件
 *      新的组件向非路由组件传递路由组件都有的3个属性：history/location/match
 *      而请求的路径名称刚好在location中
 */
export default withRouter(LeftNav);
