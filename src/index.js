/*
 * JS入口文件
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//导入存储模块
import momeryCache from './utils/memoryUtils';
import localStorage from './utils/localStorage';

//导入redux相关模块
import store from './redux/store';
import { Provider } from 'react-redux';

//将localStorage中的用户中的信息保存到内存中
momeryCache.user = localStorage.getUser();

ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));
