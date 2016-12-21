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
const gulpLoadPlugins = require('gulp-load-plugins');
const generate = require('generate-weapp-module');
const handleErrors = require('../lib/handleErrors');
const exec = require('../lib/exec');
const config = require('../config');

const plugins = gulpLoadPlugins();

function generateFiles(options) {
    const file = generate({
        root: path.resolve('.'),
        name: options.name
    });

    return file;
}

function generateJson(options) {
    config.modules.push(options.name);

    try {
        fs.writeFileSync('config/config.json', JSON.stringify(config, null, 4));
    } catch (e) {
        throw e;
    }
}

const moduleTask = next => {
    inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: '请输入项目名',
        default: 'demo'
    }])
    .then((options) => {
        const res = generateFiles(options);
        if (res) generateJson(options);
        next();
    })
    .catch(err => {
        throw new plugins.util.PluginError('generate', err);
        next();
    });
};

gulp.task('module', moduleTask);

module.exports = moduleTask;
