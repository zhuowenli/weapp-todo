/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Clean distribution directory
 */
'use strict';

const path = require('path');
const gulp   = require('gulp');
const del    = require('del');
const config = require('../config.json');

const cleanTask = function (next) {
    const module = process.env.MODULE_NAME;
    const destPath = path.join(module, config.dest);

    const cleanPaths = ['dist', destPath, '.qshell', 'npm-debug*'];

    del(cleanPaths).then(() => next());
};

gulp.task('clean', cleanTask);

module.exports = cleanTask;
