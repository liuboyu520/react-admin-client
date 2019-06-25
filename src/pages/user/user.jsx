import React, { Component } from 'react';
import {
    Button,
    Card,
    Table,
    message,
    Modal
} from 'antd';

import {PAGE_SIZE} from "../../utils/const";

import { reqUsers, reqDeleteUser } from '../../api';
import LinkButton from "../../components/link-button";


/**
 * 用户管理二级路由
 */
export default class User extends Component {

    state = {
        users: []
    }

    //添加用户
    addUser = () => {
        message.success('添加用户成功');
    }

    //删除用户
    deleteUser = (user) => {

        //弹出退出登录提示框
        Modal.confirm({
            title: `确认删除${user.username}吗?`,
            onOk: async () => { //确认时执行的回调函数,因为涉及this指向的问题,改为箭头函数

                const result = await reqDeleteUser(user._id);

                if(result.status === 0){
                    //提示信息
                    message.success('删除用户成功');

                    //更新状态数据
                    this.getUsers();

                }else {
                    message.error('删除用户失败');
                }

            },
            onCancel() {

            },
        });

    }

    //获取用户列表数据
    getUsers = async () => {
        const result = await reqUsers();
        console.log(result);
        if(result.status === 0){

            //更新状态
            this.setState({
                users: result.data.users
            });

        }else {
            message.error('获取用户失败');
        }
    }

    //初始化表格列
    initColumns = () => {
        this.columns = [
            {
                title: '用户名',
                dataIndex: 'username',
                align: 'center'
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                align: 'center'
            },
            {
                title: '电话',
                dataIndex: 'phone',
                align: 'center'
            },
            {
                title: '注册时间',
                dataIndex: 'create_time',
                align: 'center'
            },
            {
                title: '所属角色',
                dataIndex: 'role_id',
                align: 'center'
            },
            {
                title: '操作',
                align: 'center',
                render: (user) => {
                    return (
                        <span>
                            <LinkButton onClick={()=>{}}>修改</LinkButton>
                            <LinkButton onClick={()=>{this.deleteUser(user)}}>删除</LinkButton>
                        </span>
                    )
                }
            },

        ];
    }

    //组件渲染前初始化表格的columns
    componentWillMount() {
        this.initColumns();
    }

    //页面渲染完成
    componentDidMount () {
        this.getUsers();
    }

    render(){

        const title = (
            <span>
                <Button type="primary" onClick={ this.addUser }>
                    创建用户
                </Button>
            </span>
        );

        const { users } = this.state;
        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey="_id"
                    dataSource={users}
                    columns={this.columns}
                    pagination={{
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                    }}
                />

            </Card>
        )
    }
}
