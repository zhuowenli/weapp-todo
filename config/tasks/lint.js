/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Lint source code
 */
'use strict';

const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins')
const handleErrors = require('../lib/handleErrors');

const plugins = gulpLoadPlugins();

const lintTask = function (cb) {
    const { js, project } = require('../config');

    return gulp.src([js.src, `!${project}/src/utils/es6-promise.js`, '!node_modules/**', '!dist/**'])
        .pipe(plugins.eslint())
        .pipe(plugins.eslint.format('node_modules/eslint-friendly-formatter'))
        .pipe(plugins.eslint.failAfterError())
        .on('error', handleErrors);
};

gulp.task('lint', lintTask);

module.exports = lintTask;
