/*
 * 应用的根组件
 */
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/login';
import Admin from './pages/admin';

export default class App extends Component {

    render(){

        return (
            <BrowserRouter>
                {/*当前只匹配一个*/}
                <Switch>
                    {/*先后顺序有影响，要注意*/}
                    <Route path="/login" component={Login}></Route>
                    <Route path="/" component={Admin}></Route>
                </Switch>
            </BrowserRouter>
        )

    }
}
