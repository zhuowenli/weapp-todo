/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';

const getItem = key => {
    if (key === null || key === undefined) {
        return {};
    }

    try {
        return wx.getStorageSync(key);
    } catch (e) {
        return {};
    }
};

/**
 * [description]
 * @param  {[type]} key   [description]
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
const setItem = (key, value) => {
    try {
        wx.setStorageSync(key, value);
    } catch (e) {
        console.error(e);
    }
};

module.exports = {
    getItem,
    setItem
};
