/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Generate new page
 */
'use strict';
const fs = require('fs');
const path = require('path');

const gulp = require('gulp');
const inquirer = require('inquirer');
const generatePage = require('generate-weapp-page');
const gulpLoadPlugins = require('gulp-load-plugins');
const handleErrors = require('../lib/handleErrors');
const config = require('../config');

const plugins = gulpLoadPlugins();
const modules = config.modules;

// utils functions
function generateFile(options) {
    const files = generatePage({
        root: path.resolve(options.module, 'src/pages/'),
        name: options.pageName,
        less: options.styleType === 'less',
        scss: options.styleType === 'scss',
        css: options.styleType === 'css',
        json: options.needConfig
    });

    files.forEach && files.forEach(file => plugins.util.log('[generate]', file));

    return files;
}

function generateJson(options) {
    const filename = path.resolve(options.module, 'src/app.json');
    const now = fs.readFileSync(filename, 'utf8');
    const temp = now.split('\n        // Dont remove this comment');

    if (temp.length !== 2) {
        return plugins.util.log('[generate]', 'Append json failed');
    }

    const result = `${temp[0].trim()},
        "pages/${options.pageName}/${options.pageName}"
        // Dont remove this comment
    ${temp[1].trim()}`;

    fs.writeFileSync(filename, result);
}

const generateTask = (next) => {

    inquirer.prompt([{
        type: 'list',
        name: 'module',
        message: '请选择小程序项目',
        choices: modules,
        default: 'demo'
    }, {
        type: 'input',
        name: 'pageName',
        message: '请输入目录名',
        default: 'index'
    }, {
        type: 'confirm',
        name: 'needConfig',
        message: '请确认是否创建默认配置文件',
        default: false
    }, {
        type: 'list',
        name: 'styleType',
        message: '请选择一个样式编译',
        // choices: ['less', 'scss', 'css'],
        choices: ['scss'],
        default: 'scss'
    }])
    .then(options => {
        const res = generateFile(options);
        if (res) generateJson(options);
        next();
    })
    .catch(err => {
        throw new plugins.util.PluginError('generate', err);
        next();
    });
};

gulp.task('generate', generateTask);
module.exports = generateTask;
