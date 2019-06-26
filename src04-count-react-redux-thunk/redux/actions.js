import {INCREMET, DECREMET} from './action-type';

/*
    增加的同步action: 返回的是对象
 */
export const increment = number => ({type: INCREMET, data: number});

/*
    减少的同步action: 返回的是对象
 */
export const decrement = number => ({type: DECREMET, data: number});

/*
    增加的异步action: 返回的是函数
 */
export const incrementAsync = number => {
    return dispatch => {
        setTimeout(()=>{
            dispatch(increment(number));
        }, 1000);
    }
}
