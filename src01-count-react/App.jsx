/*
 * 应用的根组件
 */
import React, { Component } from 'react';

export default class App extends Component {

    constructor (props){
        super(props);
        this.numRef = React.createRef();
    }

    state = {
        count: 0
    }

    increment = () => {
        let value = this.numRef.current.value * 1;
        this.setState(state => ({
            count: state.count + value
        }));
    }

    decrement = () => {
        let value = this.numRef.current.value * 1;
        this.setState(state => ({
            count: state.count - value
        }));
    }

    incrementIfOdd = () => {
        let value = this.numRef.current.value * 1;
        if(this.state.count % 2 !== 0){
            this.setState(state => ({
                count: state.count + value
            }));
        }
    }

    asyncIncrement = () => {
        let value = this.numRef.current.value *1;
        setTimeout(()=> {
            this.setState(state => ({
                count: state.count + value
            }));
        }, 1000);
    }

    render(){
        const count = this.state.count;
        return (
            <div>
                <span>click {count} times</span>
                <div>
                    <select ref={this.numRef}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button onClick={this.increment}>+</button>&nbsp;&nbsp;
                    <button onClick={this.decrement}>-</button>&nbsp;&nbsp;
                    <button onClick={this.incrementIfOdd}>incrementIfOdd</button>&nbsp;&nbsp;
                    <button onClick={this.asyncIncrement}>asyncIncrement</button>
                </div>
            </div>
        )

    }
}
