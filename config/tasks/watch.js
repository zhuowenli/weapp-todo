/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Watch source change
 */
'use strict';

const path = require('path');
const gulp = require('gulp');
const config = require('../config.json');

const watchTask = () => {
    const module = process.env.MODULE_NAME;
    const sassPath = path.join(module, config.sass.src);
    const jsonPath = path.join(module, config.json.src);
    const xmlPath = path.join(module, config.xml.src);
    const imgPath = path.join(module, config.img.src);
    const jsPath = path.join(module, config.js.src);

    gulp.watch(sassPath, ['compile:sass']);
    gulp.watch(jsonPath, ['compile:json']);
    gulp.watch(xmlPath, ['compile:xml']);
    gulp.watch(imgPath, ['compile:img']);
    gulp.watch(jsPath, ['compile:js', 'lint']);
};

gulp.task('watch', ['compile'], watchTask);

module.exports = watchTask;
