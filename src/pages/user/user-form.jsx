/*
 * 添加/修改用户表单组件
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    Form,
    Select,
    Input
} from 'antd';
const Item = Form.Item;
const Option = Select.Option;

class UserForm extends PureComponent {

    static propTypes = {
        setForm: PropTypes.func.isRequired, //父组件需要子组件的form
        user: PropTypes.object,
        roles: PropTypes.array.isRequired
    }

    //密码自定义校验规则
    validatePWd = (rule, value, callback)=>{
        if(!value){
            callback('密码不能为空');
        }else if(value.length < 4){
            callback('密码至少4位');
        }else if(value.length > 12){
            callback('密码最多12位');
        }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
            callback('密码必须是英文、数字或下划线组成');
        }else {
            //校验通过
            callback();
        }
    }

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
        const { user, roles } = this.props;
        return (
            <Form {...formItemLayout} >
                <Item label="用户名">
                    {
                        getFieldDecorator('username', { //配置对象
                            initialValue: user.username,
                            rules: [
                                { required: true, message: '用户名不能为空' }
                            ]
                        })(
                            <Input placeholder="请输入用户名"/>
                        )
                    }
                </Item>
                {
                    user._id ? null : (
                        <Item label="密码">
                            {
                                getFieldDecorator('password', { //配置对象
                                    initialValue: '',
                                    rules: [
                                        { required: true, message: '密码不能为空'},
                                        { validator:  this.validatePWd }
                                    ]
                                })(
                                    <Input placeholder="请输入密码"/>
                                )
                            }
                        </Item>
                    )
                }
                <Item label="手机号">
                    {
                        getFieldDecorator('phone', { //配置对象
                            initialValue: user.phone,
                        })(
                            <Input placeholder="请输入手机号" name="phone"/>
                        )
                    }
                </Item>
                <Item label="邮箱">
                    {
                        getFieldDecorator('email', { //配置对象
                            initialValue: user.email,
                        })(
                            <Input placeholder="请输入邮箱" name="email"/>
                        )
                    }
                </Item>
                <Item label="角色">
                    {
                        getFieldDecorator('role_id', {
                            initialValue: user.role_id
                        })(
                            <Select>
                                {
                                    roles.map(role => <Option key={role._id} value={role._id}>{role.name}</Option>)
                                }
                            </Select>
                        )
                    }
                </Item>
            </Form>
        )
    }
}

export default Form.create()(UserForm);
