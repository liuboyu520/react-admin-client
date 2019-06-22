import React, { Component } from 'react';
import { Card, Icon, Button, Table } from 'antd';

//引入调用后台接口的API
import { reqCategorys } from '../../api';

//引入自定义标签组件
import LinkButton from '../../components/link-button';

/**
 * 商品分类二级路由
 */
export default class Category extends Component {

    //状态数据
    state = {
        loading: false, //数据是否正在加载中
        categorys: [], //一级或二级分类数据
    }

    initColumns = () => {
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                width: 300,
                render: () => {
                    return (
                        <div>
                            <LinkButton>修改分类</LinkButton>
                            <LinkButton>查看子分类</LinkButton>
                        </div>
                    )
                }
            },
        ];
    }

    getCategorys = async () => {

        //发送请求前显示loading
        this.setState({loading: true});
        const result = await reqCategorys();

        //返回结果后隐藏loading
        this.setState({loading: false});
        this.setState({
            categorys: result.data
        });
        
    }

    //组件渲染前初始化表格的columns
    componentWillMount() {
        this.initColumns();
    }

    //发送异步请求ajax
    componentDidMount() {
        this.getCategorys();
    }

    render(){

        //读取状态数据
        const { categorys } = this.state;

        const title = '一级分类列表';
        const extra = (
            <Button type="primary">
                <Icon type="plus"/>
                添加
            </Button>
        )
        return (
            <div>
                <Card title={title} extra={extra}>
                    <Table
                        bordered
                        rowKey="_id"
                        dataSource={categorys}
                        columns={this.columns} />;
                </Card>
            </div>
        )
    }
}
