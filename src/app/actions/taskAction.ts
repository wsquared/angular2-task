import {List} from 'immutable';
import {TaskModel} from '../task/taskModel';

export const LOAD_TASKS: string = 'LOAD_TASKS';
export const UPDATE_TASK: string = 'UPDATE_TASK';
export const ADD_TASK: string = 'ADD_TASK';
export const COMPLETE_TASK: string = 'COMPLETE_TASK';

export interface ITaskAction {
  type: string;
  taskList?: List<TaskModel>;
  task?: TaskModel;
  id?: string;
  completed?: boolean;
}

export function load(taskList: List<TaskModel>): ITaskAction {
  return {
    type: LOAD_TASKS,
    taskList: taskList
  };
}

export function updateTask(task: TaskModel): ITaskAction {
  return {
    type: UPDATE_TASK,
    task: task
  };
}

export function addTask(task: TaskModel): ITaskAction {
  return {
    type: ADD_TASK,
    task: task
  };
}

export function completeTask(id: string): ITaskAction {
  return {
    type: COMPLETE_TASK,
    id: id,
    completed: true
  };
}
