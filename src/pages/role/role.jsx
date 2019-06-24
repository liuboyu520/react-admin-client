import React, { Component } from 'react';
import {
    Card,
    Button,
    Table,
    Modal,
    message
} from 'antd';

import {PAGE_SIZE} from "../../utils/const";
import { reqRoles, reqAddRole, reqUpdateRole } from '../../api';

import AddForm from './add-form';
import AuthForm from './auth-form';

/**
 * 角色管理二级路由
 */
export default class Role extends Component {

    //状态数据
    state = {
        roles: [], //所有角色数据
        role: {}, //当前选中的角色
        isShowAdd: false, //是否显示添加角色窗口
        isShowAuth: false, //是否显示角色权限设置窗口
    }

    constructor (props) {
        super(props);
        this.auth = React.createRef();
    }

    //初始化表格列
    initColumns = () => {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name',
                align: 'center'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                align: 'center'
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                align: 'center'
            },
            {
                title: '授权人',
                dataIndex: 'auth_name',
                align: 'center'
            },
        ];
    }

    //设置行属性
    onRow = (role) => {
        return {
            //点击行选中状态
            onClick: (event) => { // 点击行
                this.setState({
                    role,
                });
            },
        }
    }

    //获取角色列表数据
    getRoles = async () => {
        const result = await reqRoles();
        if(result.status === 0){
            this.setState({
                roles: result.data,
            });
        }
    }

    //添加角色
    addRole = () => {

        //表单校验通过发送请求
        this.form.validateFields(async (err, values) => {

            //隐藏窗口
            this.setState({isShowAdd: false});
            if(!err){ //校验通过

                const { roleName } = values;
                const result = await reqAddRole(roleName);
                if(result.status === 0){
                    message.success('添加角色成功');
                }else {
                    message.error('添加角色失败');
                }

                //重置所有表单项的值
                this.form.resetFields();

                //更新状态数据(使用第二种方式)
                this.setState(state => ({
                    roles: [...state.roles, result.data]
                }));

            }
        });

    }

    //修改角色(设置角色权限)
    updateRole = async () => {

        //获取当前设置权限的角色
        const { role } = this.state;

        //获取所有选中的菜单集合
        const menus = this.auth.current.getMenus();

        //设置role
        role.menus = menus;

        //请求更新
        const result = await reqUpdateRole(role);

        //隐藏窗口
        this.setState({
            isShowAuth: false
        });

        if(result.status === 0){

            //提示信息
            message.success('更新角色权限成功');

            //更新roles
            this.setState({
                roles: [...this.state.roles]
            });

        }else {
            message.error('更新角色权限失败');
        }


    }

    //组件渲染前初始化表格的columns
    componentWillMount() {
        this.initColumns();
    }

    //组件渲染完成
    componentDidMount() {
        this.getRoles();
    }

    render(){

        const { roles, role } = this.state;
        const title = (
            <span>
                <Button type="primary"
                        style={{ marginRight: 15 }}
                        onClick={ ()=> {this.setState({isShowAdd: true})}}
                >
                    创建角色
                </Button>
                <Button type="primary"
                        disabled={!role.name}
                        onClick={ ()=>{this.setState({isShowAuth: true})}}
                >
                    设置角色权限
                </Button>
            </span>
        );
        return (
            <Card title={ title }>
                <Table
                    bordered
                    rowKey="_id"
                    dataSource={ roles }
                    columns={this.columns}
                    rowSelection={{
                        type: 'radio',
                        selectedRowKeys: [role._id]
                    }}
                    pagination={{
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                    }}
                    onRow={this.onRow}
                />;

                {/* 添加角色弹出框 */}
                <Modal
                    title="添加角色"
                    visible={this.state.isShowAdd}
                    onOk={this.addRole}
                    onCancel={()=>{this.setState({isShowAdd: false})}}
                >
                    {/* 添加角色的时候需要传递的参数 */}
                    <AddForm
                        setForm={ (form) => this.form = form }
                    />
                </Modal>

                {/* 设置角色权限弹出框 */}
                <Modal
                    title="设置角色权限"
                    visible={this.state.isShowAuth}
                    onOk={this.updateRole}
                    onCancel={()=>{this.setState({isShowAuth: false})}}
                >
                    {/* 设置角色权限的时候需要传递的参数 */}
                    <AuthForm
                        setForm={ (form) => this.form = form }
                        role={role}
                        ref={this.auth}
                    />
                </Modal>
            </Card>
        )
    }
}
