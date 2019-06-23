import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

//导入组件
import ProductHome from './home';
import ProductAddUpdate from './add-update';
import ProductDetail from './detail';

/**
 * 商品管理二级路由
 */
export default class Product extends Component {

    render(){

        return (
            <Switch>
                {/* exact={true} 路径的完全匹配 */}
                <Route path="/product" component={ ProductHome } exact={true}/>
                <Route path="/product/addupdate" component={ ProductAddUpdate }/>
                <Route path="/product/detail" component={ ProductDetail }/>
            </Switch>
        )
    }
}
