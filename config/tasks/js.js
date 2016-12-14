/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Compile js source to distribution directory
 */
'use strict';

const path = require('path');
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins')
const handleErrors = require('../lib/handleErrors');
const config = require('../config.json');

const plugins = gulpLoadPlugins();


const jsTask = () => {
    const env = process.env.NODE_ENV || 'development';
    const module = process.env.MODULE_NAME;
    const isDev = () => env !== 'production';
    const isProduction = () => env === 'production';
    const jsPath = path.join(module, config.js.src);
    const destPath = path.join(module, config.dest);

    return gulp.src([jsPath])
        .pipe(plugins.if(isDev, plugins.sourcemaps.init()))
        .pipe(plugins.babel())
        .on('error', handleErrors)
        .pipe(plugins.if(isProduction, plugins.uglify()))
        .pipe(plugins.if(isDev, plugins.sourcemaps.write('.')))
        .pipe(gulp.dest(destPath));
};

gulp.task('compile:js', jsTask);
module.exports = jsTask;
