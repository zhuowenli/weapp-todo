/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Compile xml source to distribution directory
 */
'use strict';

const path = require('path');
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins')
const handleErrors = require('../lib/handleErrors');
const config = require('../config.json');

const plugins = gulpLoadPlugins();

const xmlTask = () => {
    const env = process.env.NODE_ENV || 'development';
    const module = process.env.MODULE_NAME;
    const isDev = () => env !== 'production';
    const isProduction = () => env === 'production';
    const xmlPath = path.join(module, config.xml.src);
    const destPath = path.join(module, config.dest);

    return gulp.src(xmlPath)
        .pipe(plugins.if(isDev, plugins.sourcemaps.init()))
        .pipe(plugins.if(isProduction, plugins.htmlmin({
            collapseWhitespace: true,
            // collapseBooleanAttributes: true,
            // removeAttributeQuotes: true,
            keepClosingSlash: true, // xml
            removeComments: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        })))
        .on('error', handleErrors)
        .pipe(plugins.rename({
            extname: config.xml.extname
        }))
        .pipe(plugins.if(isDev, plugins.sourcemaps.write('.')))
        .pipe(gulp.dest(destPath));
};

gulp.task('compile:xml', xmlTask);
module.exports = xmlTask;
