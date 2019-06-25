/*
 * 添加分类表单组件
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Select, Input } from 'antd';
const Item = Form.Item;

class UpdateForm extends Component {

    static propTypes = {
        categoryName: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired
    };

    componentWillMount() {
        //将form对象通过父组件通过标签属性传递过来的setForm()方法传递给父组件
        this.props.setForm(this.props.form);
    }

    render(){

        const { getFieldDecorator } = this.props.form;
        const { categoryName } = this.props;
        return (
            <Form>
                <Item>
                    {
                        getFieldDecorator('categoryName', { //配置对象
                            initialValue: categoryName,
                            rules: [
                                { required: true, message: '分类名称不能为空' }
                            ]
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
