import React, { Component } from 'react';
import {
    Card,
    Select,
    Input,
    Button,
    Table,
    Icon
} from 'antd';

//导入自定义组件LinkButton
import LinkButton from '../../components/link-button';

//引入后台接口API
import { reqProducts } from '../../api';

//引入常量模块
import { PAGE_SIZE } from '../../utils/const';

const Option = Select.Option;

/**
 * 商品管理默认子路由组件
 */
export default class ProductHome extends Component {

    state = {
        total: 0, //商品总数
        products: [], //商品列表数据
    }

    //初始化Table的列
    initColumns = () => {

        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (price) => {
                    return '￥' + price;
                }
            },
            {
                title: '状态',
                width: 100,
                dataIndex: 'status',
                render: (status) => {
                    return (
                        <span>
                            <Button type="primary" >下架</Button>
                            <span>在售</span>
                        </span>
                    )
                }
            },
            {
                title: '操作',
                width: 100,
                render: (product) => {
                    return (
                        <span>
                            <LinkButton>详情</LinkButton>
                            <LinkButton>修改</LinkButton>
                        </span>
                    )
                }
            },
        ];
    }

    //获取指定页码的商品数据
    getProducts = async (pageNum) => {

        const result = await reqProducts(pageNum, PAGE_SIZE);
        console.log(result)
        if(result.status === 0){
            const { total, list } = result.data;
            console.log(list)
            //更新状态
            this.setState({
                total,
                products: list
            });
        }
    }

    componentWillMount() {
        this.initColumns();
    }

    componentDidMount() {

        //后台请求商品列表数据
        this.getProducts(1);
    }

    render(){

        //取出状态数据
        const { products, total } = this.state;
        const title = (
            <span>
                <Select value="1" style={{ width: 150 }}>
                    <Option value="1" >按名称搜索</Option>
                    <Option value="2" >按描述搜索</Option>
                </Select>
                <Input placeholder="关键字" style={{ width: 150, margin: '0 15px' }}/>
                <Button type="primary" >搜索</Button>
            </span>
        );
        const extra = (
            <Button type="primary" >
                <Icon type="plus" />
                添加商品
            </Button>
        );

        return (
            <Card title={ title } extra={ extra }>

                {/* rowKey="_id" 数据对象的_id作为每一列的key */}
                <Table
                    bordered={true}
                    rowKey="_id"
                    dataSource={ products }
                    columns={ this.columns }
                    pagination={{
                        total: total, 
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                    }}
                />
            </Card>
        )
    }
}
