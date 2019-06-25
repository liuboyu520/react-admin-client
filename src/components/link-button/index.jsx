/*
* 自定义标签组件(外形像链接的button)
*/
import React, { Component } from 'react';
import './index.less';

export default function LinkButton (props) {

    return <button { ...props } className="link-button"></button>
}