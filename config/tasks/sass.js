/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Compile sass source to distribution directory
 */
'use strict';

const path = require('path');
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins')
const handleErrors = require('../lib/handleErrors');
const config = require('../config.json');

const plugins = gulpLoadPlugins();

const sassTask = () => {
    const env = process.env.NODE_ENV || 'development';
    const module = process.env.MODULE_NAME;
    const isDev = () => env !== 'production';
    const isProduction = () => env === 'production';
    const sassPath = path.join(module, config.sass.src);
    const destPath = path.join(module, config.dest);

    return gulp.src(sassPath)
        .pipe(plugins.if(isDev, plugins.sourcemaps.init()))
        .pipe(plugins.sass())
        .on('error', handleErrors)
        .pipe(plugins.if(isProduction, plugins.cssnano({
            compatibility: '*'
        })))
        .pipe(plugins.rename({
            extname: config.sass.extname
        }))
        .pipe(plugins.if(isDev, plugins.sourcemaps.write('.')))
        .pipe(gulp.dest(destPath));
};

gulp.task('compile:sass', sassTask);

module.exports = sassTask;
