import {
  describe,
  expect,
  it,
  beforeEach
} from 'angular2/testing';

import {List} from 'immutable';
import taskReducer from './taskReducer';
import {load, completeTask, addTask, updateTask} from '../actions/taskAction';
import {TaskModel} from '../task/taskModel';

describe('taskReducer', () => {

  let taskModel;
  let taskList;

  beforeEach(() => {
    taskModel = new TaskModel({ id: 'foo', title: 'bar' });
    taskList = List<TaskModel>().push(taskModel);
  });

  it('should load tasks', () => {
    let result = taskReducer(taskList, load(taskList));
    expect(result).toBe(taskList);
  });

  it('should update task', () => {
    let result = taskReducer(taskList, load(taskList));
    expect(result).toBe(taskList);
  });

  it('should delete task', () => {
    let result = taskReducer(taskList, completeTask(taskModel.id));
    expect(result).toBe(List<TaskModel>());
  });

  it('should add task', () => {
    let result = taskReducer(List<TaskModel>(), addTask(taskModel));
    expect(result).toEqual(taskList);
  });

});
