/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Compile img source to distribution directory
 */
'use strict';

const path = require('path');
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins')
const handleErrors = require('../lib/handleErrors');
const config = require('../config.json');

const plugins = gulpLoadPlugins();

const imgTask = () => {
    const module = process.env.MODULE_NAME;
    const imgPath = path.join(module, config.img.src);
    const destPath = path.join(module, config.dest);

    return gulp.src(imgPath)
        .pipe(plugins.imagemin())
        .on('error', handleErrors)
        .pipe(gulp.dest(destPath));
};

gulp.task('compile:img', imgTask);
module.exports = imgTask;
