import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';

import { Layout  } from 'antd';

//引入自定义组件
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';

//引入二级路由
import Home from '../home/home';
import Category from '../category/category';
import Product from '../product/product';
import User from '../user/user';
import Role from '../role/role';
import Bar from '../charts/bar';
import Line from '../charts/line';
import Pie from '../charts/pie';

const { Footer, Sider, Content } = Layout;

/**
 * 后台管理的路由
 */
export default class Admin extends Component {

    //验证用户是否登录状态(优化)
    //优化前验证的逻辑在render()方法中,这样会导致每次访问路由的时候都会进行验证,会影响效率
    componentWillMount() {

        const user = memoryUtils.user;
        //如果内存中没有存储user(用户没有登录)
        if(!user || !user._id){
            //自动跳转到登录页面
            return <Redirect to="/login"/>
        }
    }

    render(){

        return (
            <Layout style={{ minHeight: '100%' }}>
                {/* 左侧菜单 */}
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{ margin: 20, backgroundColor: '#fff' }}>
                        {/* 配置所有的二级路由 */}
                        <Switch>
                            <Route path='/home' component={Home}/>
                            <Route path='/category' component={Category}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/role' component={Role}/>
                            <Route path='/user' component={User}/>
                            <Route path='/charts/bar' component={Bar}/>
                            <Route path='/charts/line' component={Line}/>
                            <Route path='/charts/pie' component={Pie}/>
                            {/* 以上都不匹配时重定向到/home */}
                            <Redirect to='/home' />
                        </Switch>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout>
        )
    }
}
