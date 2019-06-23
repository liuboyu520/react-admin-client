/*
 * 添加分类表单组件
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Select, Input } from 'antd';
const Item = Form.Item;
const Option = Select.Option;

class AddForm extends Component {

    static propTypes = {
        categorys: PropTypes.array.isRequired, //一级分类
        parentId: PropTypes.string.isRequired, //父分类Id
        setForm: PropTypes.func.isRequired
    }

    componentWillMount() {
        this.props.setForm(this.props.form);
    }

    render(){

        const { getFieldDecorator } = this.props.form;
        const { categorys, parentId } = this.props;
        return (
            <Form>
                <Item>

                    {
                        getFieldDecorator('parentId', { //配置对象, initialValue: parentId 能够动态的选择到对应的分类
                            initialValue: parentId
                        })(
                            <Select >
                                <Option value="0">一级分类</Option>
                                {/* 一级分类的Id作为二级分类的父Id */}
                                {
                                    categorys.map((item, index) => <Option key={ index } value={ item._id }>{ item.name }</Option>)
                                }
                            </Select>
                        )
                    }

                </Item>
                <Item>
                    {
                        getFieldDecorator('categoryName', { //配置对象
                            initialValue: ''
                        })(
                            <Input placeholder="请输入分类名称"/>
                        )
                    }
                </Item>
            </Form>
        )
    }
}

export default Form.create()(AddForm);
