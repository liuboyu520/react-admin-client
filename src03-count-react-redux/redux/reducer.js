import {INCREMET, DECREMET} from './action-type';
export default function count (state=1, action) {
    switch (action.type) {
        case INCREMET:
            return state + action.data;
        case DECREMET:
            return state - action.data;
        default:
            return state;
    }
}