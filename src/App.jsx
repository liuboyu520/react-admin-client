/*
 * 应用的根组件
 */
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Admin from './pages/admin';
import Login from './pages/login';

export default class App extends Component {

    render(){

        return (
            <div>
                <BrowserRouter>

                    {/* 当前只执行一个路由组件 */}
                    <Switch>
                        {/* 顺序有影响,要注意 */}
                        <Route path="/login" component={Login}/>
                        <Route path="/" component={Admin}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )

    }
}
