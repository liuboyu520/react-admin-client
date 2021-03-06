import React, { Component } from 'react';
import {
    Card,
    Icon,
    Button,
    Input,
    Cascader,
    Form,
    Upload,
    message
} from 'antd';

import LinkButton from '../../components/link-button';

import { reqCategorys, reqAddOrUpdateProduct } from '../../api';

import PicturesWall from './pictures-wall';

//引入富文本编辑器
import RichTextEditor from './rich-text-editor';

const { Item } = Form;
const { TextArea } = Input;

/**
 * 商品管理商品添加和修改子路由组件
 */
class ProductAddUpdate extends Component {

    constructor(props) {
        super(props);
        this.pw = React.createRef();
        this.editor = React.createRef();
    }

    state = {
        options: [],
    };

    //组件渲染完成时
    componentDidMount() {
        this.getCategorys('0');
    }

    //组件即将渲染前
    componentWillMount() {

        //获取传递过来的state
        const { product }  = this.props.location.state || {};

        //是否更新商品的标识
        //保存该标识
        this.isUpdate = !!product; //将变量转变成布尔值

        //保存商品信息
        this.product = product || {};

    }

    //初始化options数据
    initOptions = async (categorys) => {

        //根据categorys生成options数组
        const options = categorys.map(item => ({
            value: item._id,
            label: item.name,
            isLeaf: false, //是否叶子节点
        }));

        //如果是一个二级分类商品的更新
        const { isUpdate, product } = this;
        const { pCategoryId, categoryId } = product
        if(isUpdate && pCategoryId !== '0'){

            //获取对应的二级分类列表
            const subCategorys = await this.getCategorys(pCategoryId);

            //生成一个二级列表的options
            const childOptions = subCategorys.map(subCatory => ({
                value: subCatory._id,
                label: subCatory.name,
                isLeaf: true, //是否叶子节点
            }));

            //找到当前商品对应的一级option
            const targetOption = options.find(option => option.value === pCategoryId);

            //将二级列表的options关联到当前的option上
            if(targetOption){
                targetOption.children = childOptions
            }
        }

        //更新状态
        this.setState({
            options,
        });

    }

    //获取一级/二级分类列表
    getCategorys = async (categoryId) => {

        const result = await reqCategorys(categoryId);
        if(result.status === 0){

            //一级/二级列表数据
            const categorys = result.data;

            if(categoryId === '0'){ //一级列表
                //初始化options
                this.initOptions(categorys);
            }else { //二级列表
                return categorys;
            }
        }
    }

    //验证商品价格的自定义校验函数
    validatePrice = (rule, value, callback) => {

        if(value*1 > 0){ //将字符串数字转换成数字
            callback();
        }else {
            callback('价格必须大于0');
        }
    }

    //表单提交
    formSubmit = (event) => {

        //阻止默认行为
        event.preventDefault();

        //表单全部验证通过才发送ajax请求
        this.props.form.validateFields(async (err, values) => {
            if(!err){

                //图片信息
                const imgs = this.pw.current.getUploadImgNames();

                //商品详情
                const detail = this.editor.current.getDetail();

                let categoryId = '';
                let pCategoryId = '';

                //收集表单数据
                const { name, desc, price, categoryIds } = values;

                if(categoryIds.length === 1){
                    pCategoryId = '0';
                    categoryId = categoryIds[0];
                }else {
                    pCategoryId = categoryIds[0];
                    categoryId = categoryIds[1];
                }

                //封装成请求参数对象
                const product = { name, desc, price, categoryId, pCategoryId, imgs, detail };

                //如果是更新,向product中添加一个_id属性
                if(this.isUpdate){
                    product._id = this.product._id;
                }

                //请求后台进行添加/更新操作
                const result = await reqAddOrUpdateProduct(product);

                if(result.status === 0){

                    //提示成功信息
                    message.success(`${this.isUpdate ? '更新' : '添加'}商品成功`);

                    this.props.history.goBack();

                }else {
                    message.error(`${this.isUpdate ? '更新' : '添加'}商品失败`);
                }
            }
        });

    }

    //加载二级分类数据
    loadData = async (selectedOptions) => {

        //得到选择的Option对象
        const targetOption = selectedOptions[0];

        //显示loading加载动画
        targetOption.loading = true;

        //根据选中的分类加载二级分类数据
        const subCategorys = await this.getCategorys(targetOption.value);

        //关闭loading加载动画
        targetOption.loading = false;

        //二级分类有数据
        if(subCategorys && subCategorys.length > 0){

            //生成一个二级列表的options
            const childOptions = subCategorys.map(subCatory => ({
                value: subCatory._id,
                label: subCatory.name,
                isLeaf: true, //是否叶子节点
            }));

            //将二级列表的options关联到当前的option上
            targetOption.children = childOptions;

        }else {
            targetOption.isLeaf = true; //设置当前分类为叶子节点
        }

        //更新状态
        this.setState({
            options: [...this.state.options],
        });

    };

    render(){

        //Form.Item的布局设置
        const formItemLayout = {
            labelCol: { span: 2 }, //左侧label的宽度
            wrapperCol: { span: 8 }, //右侧包裹区域的宽度
        };

        const { getFieldDecorator } = this.props.form;

        const { isUpdate, product } = this;

        const { pCategoryId, categoryId, imgs, detail } = product;

        //商品分类数组
        const categoryIds = [];

        if(isUpdate){

            if(pCategoryId === '0'){ //一级分类
                categoryIds.push(categoryId);
            }else { //二级分类
                categoryIds.push(pCategoryId);
                categoryIds.push(categoryId);
            }
        }

        const title = (
            <span>
                <LinkButton onClick={ () => {this.props.history.goBack()} }>
                    <Icon type="arrow-left" style={{ marginRight: 10 }}></Icon>
                    <span>{isUpdate ? '修改商品' : '添加商品'}</span>
                </LinkButton>
            </span>
        );

        return (
            <Card title={ title }>
                <Form { ...formItemLayout } onSubmit={ this.formSubmit }>
                    <Item label="商品名称">
                        {
                            getFieldDecorator('name', {
                                initialValue: product.name,
                                rules: [
                                    { required: true, whiteSpace: true, message: '商品名称不能为空' }
                                ]
                            })(

                                <Input placeholder="商品名称"/>
                            )
                        }
                    </Item>
                    <Item label="商品描述">
                        {
                            getFieldDecorator('desc', {
                                initialValue: product.desc,
                                rules: [
                                    { required: true, whiteSpace: true, message: '商品描述不能为空' }
                                ]
                            })(

                                <TextArea placeholder="商品描述" autosize={{ minRows: 2, maxRows:6 }}/>
                            )
                        }
                    </Item>
                    <Item label="商品价格">
                        {
                            getFieldDecorator('price', {
                                initialValue: product.price,
                                rules: [
                                    { required: true, whiteSpace: true, message: '商品价格不能为空' },
                                    { validator: this.validatePrice }
                                ]
                            })(

                                <Input type="number" placeholder="商品价格" addonAfter="元"/>
                            )
                        }
                    </Item>
                    <Item label="商品分类">
                        {
                            getFieldDecorator('categoryIds', {
                                initialValue: categoryIds,
                                rules: [
                                    { required: true, message: '商品分类不能为空' },
                                ]
                            })(
                                <Cascader
                                    options={this.state.options}
                                    loadData={this.loadData}
                                />
                            )
                        }
                    </Item>
                    <Item label="商品图片">
                        <PicturesWall ref={ this.pw } imgs={imgs}/>
                    </Item>
                    <Item label="商品详情"
                          labelCol={{ span: 2 }}
                          wrapperCol={{ span: 20 }}>
                        <RichTextEditor ref={ this.editor } detail={ detail }/>
                    </Item>
                    <Item>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(ProductAddUpdate);
