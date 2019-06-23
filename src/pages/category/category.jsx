import React, {Component} from 'react';
import {Card, Icon, Button, Table, message, Modal} from 'antd';

//引入调用后台接口的API
import { reqCategorys, reqUpdateCategory, reqAddCategory } from '../../api';

//引入自定义标签组件
import LinkButton from '../../components/link-button';
import AddForm from './add-form';
import UpdateForm from './update-form';

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
        parentName: '', //父级分类名称
        showStatus: 0, //控制隐藏及显示弹出框的类型 0：隐藏  1：显示添加分类弹出框  2：显示更新分类弹出框
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

                            {/* 点击修改分类的时候要将原来的值回显到修改页面中 */}
                            <LinkButton onClick={ () => this.showUpdateWindow(category) }>修改分类</LinkButton>
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
    getCategorys = async (parentId) => {

        //发送请求前显示loading
        this.setState({loading: true});

        //读取parentId
        parentId = parentId || this.state.parentId; //参数有传递parentId则使用传递过来的

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

    //显示更新分类弹出窗口
    showUpdateWindow = (category) => {

        //保存分类对象
        this.category = category;

        //更新状态
        this.setState({
            showStatus: 2
        });
    }

    //修改分类
    updateCategory = async () => {

        //隐藏修改分类窗口
        this.setState({
            showStatus: 0
        });

        //准备更新分类的参数
        const categoryId = this.category._id;
        const categoryName = this.form.getFieldValue('categoryName');

        //重置所有输入框控件的值
        this.form.resetFields();

        //发送请求更新分类
        const result = await reqUpdateCategory(categoryId, categoryName);

        //重新加载分类列表
        if(result.status === 0){
            this.getCategorys();
        }

    }

    //显示添加分类弹出窗口
    showAddWindow = () => {
        this.setState({
            showStatus: 1
        });
    }

    //添加分类
    addCategory = async () => {

        //隐藏添加分类窗口
        this.setState({
            showStatus: 0
        });

        //准备添加分类的参数
        const { parentId, categoryName } = this.form.getFieldsValue();

        //重置所有输入框控件的值
        this.form.resetFields();

        //发送请求添加分类
        const result = await reqAddCategory(parentId, categoryName);

        if(result.status === 0){

            //添加的分类就是当前分类列表下的分类
            if(parentId === this.state.parentId){
                //重新加载当前分类列表显示
                this.getCategorys();
            }else if(parentId === '0'){ //在二级分类列表下添加一级分类
                //1.重新获取一级分类
                //2.不需要显示一级分类,因为当前界面显示在二级分类,只要保证一级分类数据更新就好
                this.getCategorys('0');
            }

        }

    }

    //关闭添加/更新窗口
    handleCancel = () => {

        //重置所有输入框控件的值
        if(this.form){
            this.form.resetFields();
        }

        this.setState({
            showStatus: 0
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

    render() {

        //读取状态数据
        const {categorys, subCategorys, parentId, parentName} = this.state;

        //分类对象
        const category = this.category || {}; //防止报错

        //标题动态显示
        const title = parentId === '0' ? '一级分类列表' : (
            <span>
                <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
                <Icon type="arrow-right" style={{marginRight: 5}}/>
                <span>{parentName}</span>
            </span>
        );
        const extra = (
            <Button type="primary" onClick={this.showAddWindow}>
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

                {/* 添加分类弹出框 */}
                <Modal
                    title="添加分类"
                    visible={this.state.showStatus === 1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                >
                    {/* 添加分类的时候需要传递的参数 */}
                    <AddForm
                        categorys={ categorys }
                        parentId={ parentId }
                        setForm={ (form) => this.form = form }
                    />
                </Modal>

                {/* 修改分类弹出框 */}
                <Modal
                    title="修改分类"
                    visible={this.state.showStatus === 2}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}
                >
                    {/* 从UpdateForm组件中获取form对象 */}
                    <UpdateForm
                        categoryName={ category.name }
                        setForm={ (form) =>
                            this.form = form }
                    />
                </Modal>
            </div>
        )
    }
}
