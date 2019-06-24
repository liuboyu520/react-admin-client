/*
 * 添加角色表单组件
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Select, Input } from 'antd';
const Item = Form.Item;

class AddForm extends Component {

    static propTypes = {
        setForm: PropTypes.func.isRequired //父组件需要子组件的form
    }

    //将子组件的form设置给父组件
    componentWillMount() {
        this.props.setForm(this.props.form);
    }

    render(){

        //Form.Item的布局设置
        const formItemLayout = {
            labelCol: { span: 5 }, //左侧label的宽度
            wrapperCol: { span: 16 }, //右侧包裹区域的宽度
        };

        const { getFieldDecorator } = this.props.form;
        return (
            <Form {...formItemLayout} >
                <Item label="角色名称">
                    {
                        getFieldDecorator('roleName', { //配置对象
                            initialValue: '',
                            rules: [
                                { required: true, message: '角色名称不能为空' }
                            ]
                        })(
                            <Input placeholder="请输入角色名称"/>
                        )
                    }
                </Item>
            </Form>
        )
    }
}

export default Form.create()(AddForm);
