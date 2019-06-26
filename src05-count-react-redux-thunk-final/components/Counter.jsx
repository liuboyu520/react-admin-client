import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Counter extends Component {

    constructor(props){
        super(props);
        this.numRef = React.createRef();
    }

    static propTypes = {
        count: PropTypes.number.isRequired,
        increment: PropTypes.func.isRequired,
        decrement: PropTypes.func.isRequired,
        incrementAsync: PropTypes.func.isRequired
    }

    increment = () => {
        const value = this.numRef.current.value * 1;
        this.props.increment(value);
    }

    decrement = () => {
        const value = this.numRef.current.value * 1;
        this.props.decrement(value);
    }

    incrementOfOdd = () => {
        const value = this.numRef.current.value * 1;
        if(this.props.count % 2 !== 0){
            this.props.increment(value);
        }
    }

    asyncIncrement = () => {
        const value = this.numRef.current.value * 1;
        this.props.incrementAsync(value);
    }

    render(){
        const count = this.props.count;
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
