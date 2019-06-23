import React, { Component } from 'react';
import {
    Card,
    List,
    Icon
}from 'antd';

import LinkButton from '../../components/link-button';
import { BASE_IMG_URL } from '../../utils/const';

const Item = List.Item;

/**
 * 商品管理商品详情子路由组件
 */
export default class ProductDetail extends Component {

    render(){

        //读取携带过来的state属性
        const { name, desc, price, detail, imgs } = this.props.location.state.product;
        const title = (
            <span>
                <LinkButton>
                    <Icon
                        type="arrow-left"
                        style={{ color: 'green', marginRight:10 }}
                        onClick={ () => this.props.history.goBack() }
                    />
                </LinkButton>
                <span>商品详情</span>
            </span>
        );
        return (
            <Card title={ title } className="product-detail">
                <List>
                    <Item>
                        <span className="left">商品名称：</span>
                        <span>{ name }</span>
                    </Item>
                    <Item>
                        <span className="left">商品名描述：</span>
                        <span>{ desc }</span>
                    </Item>
                    <Item>
                        <span className="left">商品名价格：</span>
                        <span>{ price }</span>
                    </Item>
                    <Item>
                        <span className="left">所属分类：</span>
                        <span>这是一个神奇的商品</span>
                    </Item>
                    <Item>
                        <span className="left">商品图片：</span>
                        <span>
                            {
                                imgs.map(img => (
                                    <img
                                        key={ img }
                                        className="product-img"
                                        src={ BASE_IMG_URL + img }
                                        alt="img"/>
                                ))
                            }
                        </span>
                    </Item>
                    <Item>
                        <span className="left">商品详情：</span>
                        <span  dangerouslySetInnerHTML={{ __html: detail }}></span>
                    </Item>
                </List>
            </Card>
        )
    }
}
