/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';

const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const inquirer = require('inquirer');
const runSequence = require('run-sequence')
const config = require('../config.json');

const modules = config.modules;
const plugins = gulpLoadPlugins();

const defaultTask = (next) => {
    inquirer.prompt([{
        type: 'list',
        name: 'module',
        message: '请选择小程序模块',
        choices: modules,
        default: modules[0]
    }])
    .then(options => {
        process.env.MODULE_NAME = options.module;
        runSequence('watch', next);
    })
    .catch(err => {
        throw new plugins.util.PluginError('module', err);
    });
};

gulp.task('default', defaultTask);

module.exports = defaultTask;
