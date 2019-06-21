import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import memoryUtils from '../../utils/memoryUtils';

import { Layout  } from 'antd';

//引入自定义组件
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';

const { Footer, Sider, Content } = Layout;

/**
 * 后台管理的路由
 */
export default class Admin extends Component {

    render(){
        const user = memoryUtils.user;
        //如果内存中没有存储user(用户没有登录)
        if(!user || !user._id){
            //自动跳转到登录页面
            return <Redirect to="/login"/>
        }
        return (
            <Layout style={{ height: '100%' }}>
                {/* 左侧菜单 */}
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{ backgroundColor: 'pink' }}>Content</Content>
                    <Footer style={{ textAlign: 'center' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout>
        )
    }
}
