/**
 * @author: 卓文理
 * @email : 531840344@qq.com
 * @desc  : Description
 */
'use strict';

import localStorage from '../../utils/localStorage';

// 创建页面实例对象
Page({
    /**
     * 页面的初始数据
     */
    data: {
        allDone: false,
        newTodo: '',
        todos: [],
        remaining: 0,
        completed: 0,
        editedTodo: null,
        visibility: 'all'
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        const todos = localStorage.getItem('todos');

        if (todos) {
            this.setData({ todos });
            this.updateAllDone();
        }
    },

    /**
     * 根据 id 获取 TODO
     * @param  {Number} id TODO id
     * @return {Object}    TODO Object
     */
    fetchTodosById(id) {
        const { todos } = this.data;
        let index;

        if (id) {
            todos.map((todo, i) => {
                if (todo.id === parseInt(id, 10)) {
                    index = i;
                }
            });

            return { index, todo: todos[index] };
        }

        return {};
    },

    /**
     * 更新数据
     */
    updateAllDone() {
        const { todos } = this.data;
        const { length } = todos;
        const checked = [];

        todos.map(todo => {
            if (todo.completed) {
                checked.push(todo);
            }
        });

        const allDone = checked.length === length ? true : false;
        const remaining = length - checked.length;
        const completed = checked.length;

        this.setData({ allDone, remaining, completed });
    },

    /**
     * 数据提交
     */
    handleFormSubmit() {
        const { todos } = this.data;
        const title = this.data.newTodo;
        // ID作为TODO的唯一标识，尽量保证每个ID是唯一的。
        const id = parseInt(Math.random() * 1e6, 10) + todos.length;

        todos.push({ id, title, completed: false });
        localStorage.setItem('todos', todos);

        this.setData({ todos, newTodo: '' });
        this.updateAllDone();
    },

    /**
     * 清空数据
     */
    handleDataClear() {
        let { todos } = this.data;

        todos = todos.filter(todo => !todo.completed);
        localStorage.setItem('todos', todos);

        this.setData({ todos: todos });
        this.updateAllDone();
    },

    /**
     * 绑定输入框输入事件
     * @param  {Object} e 事件对象
     */
    bindNewTodo(e) {
        const { value } = e.detail;
        this.setData({ newTodo: value });
    },

    /**
     * 长按编辑 TODO
     * @param  {Object} e 事件对象
     */
    bindEditTodo(e) {
        const { id } = e.target.dataset;
        const { todo, index } = this.fetchTodosById(id);
        const { todos } = this.data;

        todo.edit = true;
        todos.splice(index, 1, todo);

        this.setData({ todos });
        localStorage.setItem('todos', todos);
    },

    /**
     * 失去焦点保存内容
     * @param  {Object} e 事件对象
     */
    bindEditTodoSave(e) {
        const { value } = e.detail;
        const { id } = e.target.dataset;
        const { todo, index } = this.fetchTodosById(id);
        const { todos } = this.data;

        todo.title = value;
        todo.edit = false;
        todos.splice(index, 1, todo);

        this.setData({ todos });
        localStorage.setItem('todos', todos);
    },

    /**
     * 删除 TODO
     * @param  {Object} e 事件对象
     */
    bindRemoveTodo(e) {
        const { id } = e.target.dataset;
        const { index } = this.fetchTodosById(id);
        const { todos } = this.data;

        todos.splice(index, 1);

        this.setData({ todos });
        localStorage.setItem('todos', todos);
    },

    /**
     * 全选操作
     */
    bindCheckAll() {
        const { allDone, todos } = this.data;

        todos.map(todo => (todo.completed = !allDone));

        this.setData({ todos });
        this.updateAllDone();

        localStorage.setItem('todos', todos);
    },

    /**
     * 完成某项 TODO
     * @param  {Object} e 事件对象
     */
    bindCheckTodo(e) {
        const { value } = e.detail;
        const { id } = e.target.dataset;
        const { todo, index } = this.fetchTodosById(id);
        const { todos } = this.data;

        todo.completed = !todo.completed;
        todos.splice(index, 1, todo);

        this.setData({ todos });
        this.updateAllDone();
        localStorage.setItem('todos', todos);
    },

    /**
     * 筛选 TODO
     * @param  {Object} e 事件对象
     */
    bindVisibilityChange(e) {
        const { value } = e.detail;

        this.setData({
            visibility: value
        });
    }
});
