/*
 * 添加角色表单组件
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Tree } from 'antd';
import menuList from '../../config/menuConfig';
const Item = Form.Item;
const { TreeNode } = Tree;

export default class AuthForm extends Component {

    static propTypes = {
        role: PropTypes.object.isRequired
    }

    getTreeNodes = (menuList) => {
        return menuList.reduce((prev, item) => {
            prev.push(
                <TreeNode title={item.title} key={item.key}>
                    {item.children ? this.getTreeNodes(item.children) : null}
                </TreeNode>
            );
            return prev;
        }, []);
    }

    //根据菜单列表数据生成权限树
    componentWillMount() {
        this.TreeNodes = this.getTreeNodes(menuList);
    }

    render(){

        //Form.Item的布局设置
        const formItemLayout = {
            labelCol: { span: 5 }, //左侧label的宽度
            wrapperCol: { span: 16 }, //右侧包裹区域的宽度
        };

        const { role } = this.props;
        return (
            <div>
                <Item label="角色名称" {...formItemLayout}>
                    <Input value={ role.name } disabled={true}/>
                </Item>
                <Tree
                    checkable
                    defaultExpandAll={true}
                >
                    <TreeNode title="平台权限" key="root">
                        {
                            this.TreeNodes
                        }
                    </TreeNode>
                </Tree>
            </div>

        )
    }
}

