/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Copy extras to distribution directory
 */
'use strict';

const gulp = require('gulp');

const extrasTask = () => {
    return gulp.src([
        `${process.env.MODULE_NAME}/src/**/*.*`,
        `!${process.env.MODULE_NAME}/src/**/*.js`,
        `!${process.env.MODULE_NAME}/src/**/*.xml`,
        `!${process.env.MODULE_NAME}/src/**/*.scss`,
        `!${process.env.MODULE_NAME}/src/**/*.json`,
        `!${process.env.MODULE_NAME}/src/**/*.{jpe?g,png,gif}`,
    ])
    .pipe(gulp.dest('dist'));
};

gulp.task('extras', [], extrasTask);
module.exports = extrasTask;
