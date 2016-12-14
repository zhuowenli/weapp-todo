/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Build
 */
'use strict';

const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const inquirer = require('inquirer');
const runSequence = require('run-sequence')
const config = require('../config.json');

const modules = config.modules;
const plugins = gulpLoadPlugins();

const buildTask = (next) => {
    inquirer.prompt([{
        type: 'list',
        name: 'module',
        message: '请选择需要编译的小程序模块',
        choices: modules,
        default: modules[0]
    }])
    .then(options => {
        process.env.MODULE_NAME = options.module;
        process.env.NODE_ENV = 'production';

        runSequence(['compile', 'extras'], next);
    })
    .catch(err => {
        throw new plugins.util.PluginError('module', err);
    });
};

gulp.task('build', ['lint'], buildTask);

module.exports = buildTask;
