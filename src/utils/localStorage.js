/*
* 用于将登录成功的用户信息保存在localStorage中
*/
import store from 'store';

const USER_KEY = 'user_key';

export default {

    //添加
    setUser (user) {
        store.set(USER_KEY, user);
    },

    //获取
    getUser (){
        return store.get(USER_KEY) || {};
    }


}