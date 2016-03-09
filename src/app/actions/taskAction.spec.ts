import {
  describe,
  expect,
  it,
  beforeEach
} from 'angular2/testing';

import {List} from 'immutable';
import {load, updateTask, addTask, completeTask} from './taskAction';
import {TaskModel} from '../task/taskModel';

describe('taskAction', () => {

  let taskList: List<TaskModel>;
  let taskModel: TaskModel;

  beforeEach(() => {
    taskModel = new TaskModel({ id: 'foo', title: 'bar' });
    taskList = List<TaskModel>().push(taskModel);
  });

  it('should load tasks', () => {
    let taskAction = load(taskList);
    expect(taskAction.taskList).toBe(taskList);
  });

  it('should update task', () => {
    let taskAction = updateTask(taskModel);
    expect(taskAction.task).toBe(taskModel);
  });

  it('should add task', () => {
    let taskAction = addTask(taskModel);
    expect(taskAction.task).toBe(taskModel);
  });

  it('should complete task', () => {
    let taskAction = completeTask(taskModel.id);
    expect(taskAction.completed).toEqual(true);
  });

});
