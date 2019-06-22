import React, {Component} from 'react';
import {Card, Icon, Button, Table, message} from 'antd';

//引入调用后台接口的API
import {reqCategorys} from '../../api';

//引入自定义标签组件
import LinkButton from '../../components/link-button';

/**
 * 商品分类二级路由
 */
export default class Category extends Component {

    //状态数据
    state = {
        loading: false, //数据是否正在加载中
        categorys: [], //一级分类列表
        subCategorys: [], //二级分类列表
        parentId: '0', //一级分类列表父级ID
        parentName: '' //父级分类名称
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
                render: (category) => {
                    return (
                        <div>
                            <LinkButton>修改分类</LinkButton>
                            {/* 如果在事件的回调函数中获取外面传递的参数并且组件渲染的时候不执行,等到点击的时候再执行 */}
                            {/* 解决方案：在需要执行的回调逻辑外面再包裹一层函数 */}
                            {this.state.parentId === "0" ?
                                <LinkButton onClick={() => this.showSubCategorys(category)}>查看子分类</LinkButton> : null}

                        </div>
                    )
                }
            },
        ];
    }

    //获取一级/二级分类列表(根据parentId的值是否等于"0"加以区分)
    getCategorys = async () => {

        //发送请求前显示loading
        this.setState({loading: true});

        //读取parentId
        const {parentId} = this.state;

        const result = await reqCategorys(parentId);

        //返回结果后隐藏loading
        this.setState({loading: false});

        if (result.status === 0) { //请求成功

            if (parentId === "0") { //获取的是一级分类列表
                //更新状态
                this.setState({
                    categorys: result.data
                });
            } else { //获取的是二级分类列表
                //更新状态
                this.setState({
                    subCategorys: result.data
                });
            }

        } else {
            //提示信息
            message.error('请求分类数据失败！');
        }
    };

    //获取二级分类列表
    showSubCategorys = (category) => {

        //更新状态
        //setState()是一个异步执行的方法,需要等状态更新完成再执行某些操作的时候需要添加回调函数
        this.setState({
            parentId: category._id,
            parentName: category.name
        }, () => { //在状态更新后并且render()完成后再执行
            //获取二级分类列表
            this.getCategorys();
        });

    };

    //显示指定一级分类列表
    showCategorys = () => {
        //更新状态
        this.setState({
            parentId: '0',
            parentName: '',
            subCategorys: []
        });
    };

    //组件渲染前初始化表格的columns
    componentWillMount() {
        this.initColumns();
    }

    //发送异步请求ajax
    componentDidMount() {
        this.getCategorys();
    }

    render() {

        //读取状态数据
        const {categorys, subCategorys, parentId, parentName} = this.state;

        const title = parentId === '0' ? '一级分类列表' : (
            <span>
                <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
                <Icon type="arrow-right" style={{marginRight: 5}}/>
                <span>{parentName}</span>
            </span>
        );
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
                        dataSource={parentId === "0" ? categorys : subCategorys}
                        columns={this.columns}/>;
                </Card>
            </div>
        )
    }
}
