import {List} from 'immutable';
import {TaskModel} from '../task/taskModel';

export const LOAD_COMPLETED_TASKS: string = 'LOAD_COMPLETED_TASKS';

export interface ITaskCompletedAction {
  type: string;
  taskCompletedList?: List<TaskModel>;
}

export function load(taskCompletedList: List<TaskModel>): ITaskCompletedAction {
  return {
    type: LOAD_COMPLETED_TASKS,
    taskCompletedList: taskCompletedList
  };
}
