import React, { Component } from 'react';
import {
    Card,
    List,
    Icon
}from 'antd';

import LinkButton from '../../components/link-button';
import { BASE_IMG_URL } from '../../utils/const';

import { reqCategory } from '../../api';

const Item = List.Item;

/**
 * 商品管理商品详情子路由组件
 */
export default class ProductDetail extends Component {

    state = {
        cName1: '', //一级分类名称
        cName2: '', //二级分类名称
    }

    async componentDidMount() {

        //获取商品信息
        const { categoryId, pCategoryId } = this.props.location.state.product;

        if(pCategoryId === '0'){ //只需获取一级分类名称即可

            const result = await reqCategory(categoryId);
            this.setState({
                cName1: result.data.name
            });

        }else { //需要获取一级和二级分类名称

            //一次性发送多个请求,等待都成功后才执行更新操作
            const results = await Promise.all([reqCategory(categoryId), reqCategory(pCategoryId)]);

            //获取一级分类名称和二级分类名称
            const cName1 = (results[0] && results[0].data) ? results[0].data.name : '';
            const cName2 = (results[1] && results[1].data) ? results[1].data.name : '';
            this.setState({
                cName1,
                cName2,
            });
        }

    }

    render(){

        //读取携带过来的state属性
        const { name, desc, price, detail, imgs } = this.props.location.state.product;
        const { cName1, cName2 } = this.state;
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
                        <span>{ cName1 } { cName2 ? '-->' + cName2 : '' }</span>
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
