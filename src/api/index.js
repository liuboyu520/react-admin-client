
/*
* 根据接口文档定义接口请求的函数模块
*   包含应用中所有接口请求函数的模块
*   每个函数的返回值都是promise
*
*/

import ajax from './ajax';
import jsonp from 'jsonp';

import { message } from 'antd';

//用户登录
export const reqLogin = (username, password) => ajax('/login', { username, password }, 'POST');

//请求天气预报信息(jsonp)
export const reqWeather = (city) => {
    return new Promise((resolve, reject) => {
        //请求天气的url
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;

        jsonp(url, {}, (err, data) => {

            if(!err){ //请求成功

                const { dayPictureUrl, weather } = data.results[0].weather_data[0];
                resolve({
                    dayPictureUrl: dayPictureUrl,
                    weather: weather
                });
            }else {
                //提示错误信息
                message.error('天气信息无法获取');
            }
        });

    });
};

/************* 1.品类管理 Start ************/
//更加parentId获取分类数据
export const reqCategorys = (parentId) => ajax('/manage/category/list', {parentId});

//更新分类
export const reqUpdateCategory = (categoryId, categoryName) => ajax('/manage/category/update', {categoryId, categoryName}, 'POST');

//添加分类
export const reqAddCategory = (parentId, categoryName) => ajax('/manage/category/add', {parentId, categoryName}, 'POST');

//根据ID获取一个分类信息
export const reqCategory = (categoryId) => ajax('/manage/category/info', { categoryId });


/************* 2.商品管理 Start ************/
//获取商品列表(分页)
export const reqProducts = (pageNum, pageSize) => ajax('/manage/product/list', {pageNum, pageSize});

//搜索商品列表(分页)
export const reqSearchProducts = (pageNum, pageSize, searchType, searchName) => {
    return ajax('/manage/product/search', {
        pageNum,
        pageSize,
        [searchType]: searchName
    });
};

//更新商品状态(下架/上架)
export const reqUpdateStatus = (productId, status) => ajax('/manage/product/updateStatus', { productId, status }, 'POST');

//删除图片
export const reqDeleteImage = (name) => ajax('/manage/img/delete', { name }, 'POST');

//添加/更新商品
//(product._id ? 'update' : 'add')必须要用括号包起来,否则路径只能拿到update或add
export const reqAddOrUpdateProduct = (product) => ajax('/manage/product/' + (product._id ? 'update' : 'add'), product, 'POST');

/************* 3.角色管理 Start ************/
//获取角色列表
export const reqRoles = () => ajax('/manage/role/list', {});

//添加角色
export const reqAddRole = (roleName) => ajax('/manage/role/add', {roleName}, 'POST');

//更新角色(设置角色权限)
export const reqUpdateRole = (role) => ajax('/manage/role/update', role, 'POST');

/************* 4.用户管理 Start ************/
//获取所有用户
export const reqUsers = () => ajax('/manage/user/list', {});

//根据用户ID删除用户
export const reqDeleteUser = (userId) => ajax('/manage/user/delete', { userId }, 'POST');

//添加或修改用户
export const reqAddOrUpdateUser = (user) => ajax('/manage/user/' + (user._id ? 'update' : 'add'), user, 'POST');


