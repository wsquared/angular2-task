import {
  describe,
  expect,
  it,
  beforeEach
} from 'angular2/testing';

import {List} from 'immutable';
import {load} from './taskCompletedAction';
import {TaskModel} from '../task/taskModel';

describe('taskAction', () => {

  let taskCompletedList: List<TaskModel>;
  let taskModel: TaskModel;

  beforeEach(() => {
    taskModel = new TaskModel({ id: 'foo', title: 'bar' });
    taskCompletedList = List<TaskModel>().push(taskModel);
  });

  it('should load tasks', () => {
    let taskCompletedAction = load(taskCompletedList);
    expect(taskCompletedAction.taskCompletedList).toBe(taskCompletedList);
  });

});
