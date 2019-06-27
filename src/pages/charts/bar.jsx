import React, { Component } from 'react';
import {
    Card,
    Button
} from 'antd';
import ReactEcharts from 'echarts-for-react';

/**
 * 柱形图二级路由
 */
export default class Bar extends Component {

    state = {
        sales: [5, 20, 36, 10, 10, 20],  //销量
        stock: [30, 60, 23, 68, 10, 80]   //库存
    }

    //更新图表数据
    update = () => {
        const { sales, stock } = this.state;
        this.setState({
            sales: sales.map(item => item + 1),
            stock: stock.map(item => item - 1)
        });
    }

    //初始化图表数据
    getOption = () => {

        const { sales, stock } = this.state;
        return  {
            title: {
                text: '商品销售柱状图'
            },
            tooltip: {},
            legend: {
                data:['销量','库存']
            },
            xAxis: {
                data: ["苹果电脑","戴尔电脑","东芝电脑","联想电脑","惠普电脑","外星人电脑"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: sales
            },
                {
                    name: '库存',
                    type: 'bar',
                    data: stock
                }]
        };
    }

    render(){

        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.update}>更新</Button>
                </Card>
                <Card title="柱状图一">
                    <ReactEcharts option={this.getOption()} />
                </Card>
            </div>

        )
    }
}
