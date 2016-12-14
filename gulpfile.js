/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';

const gulp = require('gulp')
const requireDir = require('require-dir');

// Require all tasks, including subfolders
requireDir('./config/tasks/', { recurse: true });