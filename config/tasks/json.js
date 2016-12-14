/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Compile json source to distribution directory
 */
'use strict';

const path = require('path');
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins')
const handleErrors = require('../lib/handleErrors');
const config = require('../config.json');

const plugins = gulpLoadPlugins();

const jsonTask = () => {
    const env = process.env.NODE_ENV || 'development';
    const module = process.env.MODULE_NAME;
    const isDev = () => env !== 'production';
    const isProduction = () => env === 'production';
    const jsonPath = path.join(module, config.json.src);
    const destPath = path.join(module, config.dest);

    return gulp.src([jsonPath])
        .pipe(plugins.if(isDev, plugins.sourcemaps.init()))
        .pipe(plugins.jsonminify())
        .on('error', handleErrors)
        .pipe(plugins.if(isDev, plugins.sourcemaps.write('.')))
        .pipe(gulp.dest(destPath));
};

gulp.task('compile:json', jsonTask);
module.exports = jsonTask;
