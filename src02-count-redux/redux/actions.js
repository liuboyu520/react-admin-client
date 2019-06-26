import {INCREMET, DECREMET} from './action-type';
export function increment(number){
    return {
        type: INCREMET,
        data: number
    }
}

export function decrement(number){
    return {
        type: DECREMET,
        data: number
    }
}
