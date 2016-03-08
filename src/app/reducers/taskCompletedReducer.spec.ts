import {
  describe,
  expect,
  it,
} from 'angular2/testing';

import {List} from 'immutable';
import taskCompletedReducer from './taskCompletedReducer';
import {load} from '../actions/taskCompletedAction';
import {TaskModel} from '../task/taskModel';

describe('taskCompletedReducer', () => {

  it('should load tasks', () => {
    let taskModel = new TaskModel({ id: 'foo', title: 'bar' });
    let taskList = List<TaskModel>().push(taskModel);
    let result = taskCompletedReducer(taskList, load(taskList));
    expect(result).toBe(taskList);
  });

});
