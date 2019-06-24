import React, { Component } from 'react';
import {
    Card,
    Button,
    Table
} from 'antd';

import {PAGE_SIZE} from "../../utils/const";

import { reqRoles } from '../../api';

/**
 * 角色管理二级路由
 */
export default class Role extends Component {

    //状态数据
    state = {
        roles: [],
    }

    //初始化表格列
    initColumns = () => {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name',
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
            },
            {
                title: '授权人',
                dataIndex: 'auth_name',
            },
        ];
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

    //组件渲染前初始化表格的columns
    componentWillMount() {
        this.initColumns();
    }

    //组件渲染完成
    componentDidMount() {
        this.getRoles();
    }

    render(){

        const { roles } = this.state;

        const title = (
            <span>
                <Button type="primary" style={{ marginRight: 15 }}>创建角色</Button>
                <Button type="primary">设置角色权限</Button>
            </span>
        );
        return (
            <Card title={ title }>
                <Table
                    bordered
                    rowKey="_id"
                    dataSource={ roles }
                    columns={this.columns}
                    pagination={{
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                    }}
                />;
            </Card>
        )
    }
}
