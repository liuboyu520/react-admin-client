import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {increment, decrement} from './redux/actions';
export default class App extends Component {

    constructor(props){
        super(props);
        this.numRef = React.createRef();
    }

    static propTypes = {
        store: PropTypes.object.isRequired
    }

    increment = () => {
        const value = this.numRef.current.value * 1;
        this.props.store.dispatch(increment(value));
    }

    decrement = () => {
        const value = this.numRef.current.value * 1;
        this.props.store.dispatch(decrement(value));
    }

    incrementOfOdd = () => {
        const value = this.numRef.current.value * 1;
        if(this.props.store.getState() % 2 !== 0){
            this.props.store.dispatch(increment(value));
        }
    }

    asyncIncrement = () => {
        const value = this.numRef.current.value * 1;
        setTimeout(()=>{
            this.props.store.dispatch(increment(value));
        }, 1000);
    }

    render(){
        const count = this.props.store.getState();
        return (
            <div>
                <h2>Click {count} Times</h2>
                <div>
                    <select ref={this.numRef}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button onClick={this.increment}>+</button>&nbsp;&nbsp;
                    <button onClick={this.decrement}>-</button>&nbsp;&nbsp;
                    <button onClick={this.incrementOfOdd}>incrementOfOdd</button>&nbsp;&nbsp;
                    <button onClick={this.asyncIncrement}>asyncIncrement</button>
                </div>
            </div>
        )
    }
}
