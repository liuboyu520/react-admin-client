import React, { Component } from 'react';
import {
    Form,
    Icon,
    Input,
    Button,
    message
} from 'antd';

//引入logo图片
import logo from '../../assets/images/logo.png';

//加载样式文件
import './index.less';

//引入API模块
import { reqLogin } from '../../api';

import memoryCache from '../../utils/memoryUtils';

/**
 * 登录的路由组件
 */
class Login extends Component {

    handleSubmit = event =>{

        //阻止表单默认行为
        event.preventDefault();

        //提交表单验证
        this.props.form.validateFields( async (err, values)=>{

            //所有表单项都验证通过(表单验证成功)
            if(!err){

                //获取用户名和密码
                const { username, password } = values;

                //用户登录
                //用await和async改造过后
                const result = await reqLogin(username, password);
                if(result.status === 0){ //用户登录成功

                    //提示登录成功信息
                    message.success('登录成功！');

                    //保存用户信息到内存中
                    memoryCache.user = result.data;

                    //跳转到管理页面
                    //什么时候用push()什么时候用replace() => 不需要再回退的时候用replace()
                    this.props.history.replace('/');

                }else { //登录失败
                    //提示相关信息
                    message.error(result.msg);

                }

            }
        });

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

    render(){

        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <header className="login-header">
                    <img src={ logo } alt="logo"/>
                    <h1>React项目：后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {
                                /*
                                    用户名/密码的的合法性校验
                                1). 必须输入
                                2). 必须大于等于4位
                                3). 必须小于等于12位
                                4). 必须是英文、数字或下划线组成
                               */
                            }
                            {
                                getFieldDecorator('username', { // 配置对象: 属性名是特定的一些名称
                                    // 声明式验证: 直接使用别人定义好的验证规则进行验证
                                    rules: [
                                        { required: true, message: '用户名不能为空' },
                                        { min: 4, message: '用户名至少4位' },
                                        { max: 12, message: '用户名最多12位' },
                                        { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        placeholder="用户名"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('password', {
                                    // 自定义校验
                                    rules: [
                                        {
                                            validator: this.validatePWd
                                        }
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                        type="password"
                                        placeholder="密码"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}

export default Form.create()(Login);
