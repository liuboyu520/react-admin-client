/*
 * 添加分类表单组件
 */

import React, { Component } from 'react';
import { Form, Select, Input } from 'antd';
const Item = Form.Item;
const Option = Select.Option;

class AddForm extends Component {

    render(){

        const { getFieldDecorator } = this.props.form;
        return (
            <Form>
                <Item>

                    {
                        getFieldDecorator('parentId', { //配置对象
                            initialValue: '0'
                        })(
                            <Select >
                                <Option value="0">一级分类</Option>
                                <Option value="1">手机</Option>
                                <Option value="2">电脑</Option>
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
