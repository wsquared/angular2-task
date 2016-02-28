import { List } from 'immutable';
import { TaskModel } from '../task/taskModel';

import {
LOAD_TASKS,
UPDATE_TASK,
} from '../actions/taskAction';

export default function(state: List<TaskModel>, action) {
  switch (action.type) {
    case LOAD_TASKS:
      state = action.taskList;
      return List<TaskModel>(state);
    case UPDATE_TASK:
      let index = state.findIndex((task) => task.id === action.task.id);
      let task: TaskModel = state.get(index);
      return state.set(
        index,
        new TaskModel({
          id: task.id,
          title: task.title,
          details: task.details,
          dueDate: task.dueDate,
          completed: task.completed,
          completedDate: task.completedDate
        })
      );
    default:
      return List<TaskModel>(state);
  }
}
