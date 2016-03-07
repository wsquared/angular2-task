import {List} from 'immutable';
import {TaskModel} from '../task/taskModel';

import {LOAD_COMPLETED_TASKS, ITaskCompletedAction} from '../actions/taskCompletedAction';

export default function(state: List<TaskModel>, action: ITaskCompletedAction) {
  switch (action.type) {
    case LOAD_COMPLETED_TASKS:
      state = action.taskCompletedList;
      return List<TaskModel>(state);
    default:
      return List<TaskModel>(state);
  }
}
