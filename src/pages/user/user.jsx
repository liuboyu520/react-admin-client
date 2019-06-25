import React, { Component } from 'react';
import {
    Button,
    Card,
    Table,
    message,
    Modal
} from 'antd';

import {PAGE_SIZE} from "../../utils/const";

import { reqUsers, reqDeleteUser, reqAddOrUpdateUser } from '../../api';
import LinkButton from "../../components/link-button";
import UserForm from "./user-form";


/**f
 * 用户管理二级路由
 */
export default class User extends Component {

    state = {
        isShow: false, //是否显示添加用户窗口
        users: [], //用户列表数据
        roles: [],  //所有角色数据
    }

    //显示添加用户界面
    showAdd = () => {

        //将user清除
        this.user = null;

        //改变状态显示窗口
        this.setState({
            isShow: true
        });

    }

    //显示修改用户界面
    showUpdate = (user) => {
        //将当前要修改的user保存
        this.user = user;

        //改变状态显示窗口
        this.setState({
            isShow: true
        });

    }

    //添加/修改用户
    addOrUpdateUser = async () => {

        //收集表单数据
        const user = this.form.getFieldsValue();

        //清空表单项中的缓存
        this.form.resetFields();

        //修改用户(添加_id参数)
        if(this.user){
            user._id = this.user._id;
        }

        //发送请求
        const result = await reqAddOrUpdateUser(user);

        //处理结果
        if(result.status === 0){
            message.success(`${this.user ? '修改' : '添加'}用户成功`);
            this.getUsers();
        }

        //隐藏窗口
        this.setState({
            isShow: false
        });

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
        if(result.status === 0){

            //分别获取用户和角色数据
            const { users, roles } = result.data;

            //初始化角色名称(用于表格角色名称展示)
            this.initRoleNames(roles);

            //更新状态
            this.setState({
                users,
                roles,
            });

        }else {
            message.error('获取用户失败');
        }
    }

    initRoleNames = (roles) => {

        const roleNames = roles.reduce((prev, role) => {

            prev[role._id] = role.name;

            return prev;

        }, {});

        this.roleNames = roleNames;

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
                align: 'center',
                render: (roleId) => {
                    return this.roleNames[roleId]
                }
            },
            {
                title: '操作',
                align: 'center',
                render: (user) => {
                    return (
                        <span>
                            <LinkButton onClick={()=>{this.showUpdate(user)}}>修改</LinkButton>
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
                <Button type="primary" onClick={ this.showAdd }>
                    创建用户
                </Button>
            </span>
        );

        const { users, roles } = this.state;
        const user = this.user || {}; //对用户进行一下null处理
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

                {/* 添加用户弹出窗口 */}
                <Modal
                    title="添加用户"
                    visible={this.state.isShow}
                    onOk={this.addOrUpdateUser}
                    onCancel= { () => {
                            this.form.resetFields();
                            this.setState({isShow: false});
                        }
                    }
                >
                    {/* 添加用户需要传递的参数 */}
                    <UserForm
                        setForm={ form => this.form = form }
                        user={user}
                        roles={roles}
                    />
                </Modal>

            </Card>
        )
    }
}
