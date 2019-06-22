/*
 * 添加分类表单组件
 */

import React, { Component } from 'react';
import { Form, Select, Input } from 'antd';
const Item = Form.Item;

class UpdateForm extends Component {

    render(){

        const { getFieldDecorator } = this.props.form;
        return (
            <Form>
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

export default Form.create()(UpdateForm);
