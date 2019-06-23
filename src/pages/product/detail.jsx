import React, { Component } from 'react';
import {
    Card,
    List,
    Icon
}from 'antd';

const Item = List.Item;

/**
 * 商品管理商品详情子路由组件
 */
export default class ProductDetail extends Component {

    render(){

        const title = (
            <span>
                <Icon type="arrow-left"/>
                <span>商品详情</span>
            </span>
        );
        return (
            <Card title={ title } className="product-detail">
                <List>
                    <Item>
                        <span className="left">商品名称：</span>
                        <span>这是一个神奇的商品</span>
                    </Item>
                    <Item>
                        <span className="left">商品名描述：</span>
                        <span>这是一个神奇的商品</span>
                    </Item>
                    <Item>
                        <span className="left">商品名价格：</span>
                        <span>1000000</span>
                    </Item>
                    <Item>
                        <span className="left">所属分类：</span>
                        <span>这是一个神奇的商品</span>
                    </Item>
                    <Item>
                        <span className="left">商品图片：</span>
                        <span>
                            <img
                                className="product-img"
                                src="https://img.alicdn.com/simba/img/TB18l8tb8Kw3KVjSZFOSuurDVXa.jpg"
                                alt="img"/>
                            <img
                                className="product-img"
                                src="https://img.alicdn.com/simba/img/TB18l8tb8Kw3KVjSZFOSuurDVXa.jpg"
                                alt="img"/>
                        </span>
                    </Item>
                    <Item>
                        <span className="left">商品详情：</span>
                        <span  dangerouslySetInnerHTML={{ __html: '<h1>商品详情详情</h1>' }}></span>
                    </Item>
                </List>
            </Card>
        )
    }
}
