import {INCREMET, DECREMET} from './action-type';
import {combineReducers} from 'redux';

function count (state=1, action) {
    switch (action.type) {
        case INCREMET:
            return state + action.data;
        case DECREMET:
            return state - action.data;
        default:
            return state;
    }
}

const initUser = {};
function user (state=initUser, action) {
    switch (action.type) {
        default:
            return state;
    }
}

export default combineReducers({
    count,
    user
});