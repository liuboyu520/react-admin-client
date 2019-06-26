import React, { Component } from 'react';
import {
    Card,
    Select,
    Input,
    Button,
    Table,
    Icon,
    message
} from 'antd';

//导入自定义组件LinkButton
import LinkButton from '../../components/link-button';

//引入后台接口API
import { reqProducts,reqSearchProducts, reqUpdateStatus } from '../../api';

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
        loading: false,
        searchType: 'productName', //搜索的类型(默认显示的是'按名称搜索')
        searchName: '', //搜索的关键字
    }

    //初始化Table的列
    initColumns = () => {

        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
                align: 'center'
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
                align: 'center'
            },
            {
                title: '价格',
                dataIndex: 'price',
                align: 'center',
                render: (price) => {
                    return '￥' + price;
                }
            },
            {
                title: '状态',
                width: 100,
                align: 'center',
                render: (product) => {
                    const { _id, status } = product;
                    return (
                        <span>
                            <Button type="primary" onClick={ () => this.updateStatus(_id, status === 1 ? 2 : 1) }>{ status === 1 ? '下架' : '上架' }</Button>
                            <span>{ status === 1 ? '在售' : '已下架'}</span>
                        </span>
                    )
                }
            },
            {
                title: '操作',
                width: 200,
                align: 'center',
                render: (product) => {
                    return (
                        <span>
                            <LinkButton onClick={ () => this.props.history.push('/product/detail', {product}) }>详情</LinkButton>
                            <LinkButton onClick={() => this.props.history.push('/product/addupdate', {product})}>修改</LinkButton>
                        </span>
                    )
                }
            },
        ];
    }

    //获取指定页码的商品数据
    getProducts = async (pageNum) => {

        //保存当前pageNum的值,更新商品状态的时候需要该值
        this.pageNum = pageNum;

        //发送请求前显示loading
        this.setState({loading: true});

        //请求数据分为一下两种情况,需要分别处理:
        //1.通过搜索按钮请求数据(输入框有用户输入的关键字)
        //2.初始页面渲染商品数据/搜索按钮请求数据(输入框关键字内容为空)
        const { searchName, searchType } = this.state;

        let result;
        if(searchName){
            result = await reqSearchProducts( pageNum, PAGE_SIZE, searchType, searchName );
        }else {
            //得到请求数据
            result = await reqProducts(pageNum, PAGE_SIZE);
        }

        //得到请求结果后
        this.setState({loading: false});

        if(result.status === 0){
            const { total, list } = result.data;
            //更新状态
            this.setState({
                total,
                products: list
            });
        }
    }

    //更新商品状态(上架/下架)
    updateStatus = async (productId, status) => {

        //发送请求更新商品状态
        const result = await reqUpdateStatus(productId, status);

        if(result.status === 0){
            message.success('更新商品成功');
            //重新获取商品列表数据
            this.getProducts(this.pageNum);
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
        const { products, total, loading, searchType, searchName } = this.state;
        const title = (
            <span>
                <Select
                    value={ searchType }
                    style={{ width: 150 }}
                    onChange={ value => this.setState({ searchType: value }) }
                >
                    <Option value="productName" >按名称搜索</Option>
                    <Option value="productDesc" >按描述搜索</Option>
                </Select>
                <Input
                        placeholder="关键字"
                        style={{ width: 150, margin: '0 15px' }}
                        value={ searchName }
                        onChange={ e => this.setState({ searchName: e.target.value }) }
                />
                <Button type="primary" onClick={ ()=> this.getProducts(1) }>搜索</Button>
            </span>
        );
        const extra = (
            <Button type="primary" onClick={ () => this.props.history.push('/product/addupdate') }>
                <Icon type="plus" />
                添加商品
            </Button>
        );

        return (
            <Card title={ title } extra={ extra }>

                {/* rowKey="_id" 数据对象的_id作为每一列的key */}
                <Table
                    loading={ loading }
                    bordered={true}
                    rowKey="_id"
                    dataSource={ products }
                    columns={ this.columns }
                    pagination={{
                        total: total,
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper: true,
                        onChange: this.getProducts,
                        current: this.pageNum
                    }}
                />
            </Card>
        )
    }
}
