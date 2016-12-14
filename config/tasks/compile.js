/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Compile source to distribution directory
 */
'use strict';

const gulp = require('gulp');
const runSequence = require('run-sequence')

const compileTask = (next) => {
    runSequence(['clean'], () => {
        runSequence(['compile:sass', 'compile:json', 'compile:img', 'compile:xml', 'compile:js'], next);
    });
};

gulp.task('compile', compileTask);

module.exports = compileTask;
