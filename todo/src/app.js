/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';

App({
    /**
     * Global shared
     * 可以定义任何成员，用于在整个应用中共享
     */
    data: {
        name: 'demo',
        version: '1.0.0',
    },

    /**
    * 生命周期函数--监听小程序初始化
    * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
    */
    onLaunch () {
        console.log(' ========== Application is launched ========== ')
    },

    /**
    * 生命周期函数--监听小程序显示
    * 当小程序启动，或从后台进入前台显示，会触发 onShow
    */
    onShow () {
        console.log(' ========== Application is showed ========== ')
    },

    /**
    * 生命周期函数--监听小程序隐藏
    * 当小程序从前台进入后台，会触发 onHide
    */
    onHide () {
        console.log(' ========== Application is hid ========== ')
    }
});

