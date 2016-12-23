/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';

class Storage {
    getItem(key) {
        return wx.getStorageSync(key);
    }

    setItem(key, value) {
        return wx.setStorageSync(key, value);
    }

    removeItem(key) {
        return this.setItem(key, '');
    }

    clear() {
        return wx.clearStorageSync();
    }
}

module.exports = new Storage();
