import {List} from 'immutable';
import {TaskModel} from '../task/taskModel';

export const LOAD_TASKS: string = 'LOAD_TASKS';
export const UPDATE_TASK: string = 'UPDATE_TASK';

export function load(taskList: List<TaskModel>) {
  return {
    type: LOAD_TASKS,
    taskList: taskList
  };
}

export function updateTask(task: TaskModel) {
  return {
    type: UPDATE_TASK,
    task: task
  };
}
