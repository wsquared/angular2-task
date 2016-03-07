import {List, OrderedSet} from 'immutable';
import {TaskModel} from '../task/taskModel';

import {
LOAD_TASKS,
UPDATE_TASK,
ADD_TASK,
COMPLETE_TASK,
ITaskAction
} from '../actions/taskAction';

export default function(state: List<TaskModel>, action: ITaskAction) {

  function indexOf(id: string): number {
    return state.findIndex((i: TaskModel) => i.id === id);
  }

  switch (action.type) {
    case LOAD_TASKS:
      state = action.taskList;
      return List<TaskModel>(state).sortBy(tm => tm.dueDate);
    case UPDATE_TASK:
      let index = state.findIndex((task) => task.id === action.task.id);
      return state.set(
        index,
        new TaskModel({
          id: action.task.id,
          title: action.task.title,
          details: action.task.details,
          dueDate: action.task.dueDate,
          completed: action.task.completed,
          completedDate: action.task.completedDate
        })
      );
    case COMPLETE_TASK:
      let completedTaskIndex = state.findIndex((task) => task.id === action.id);
      return state.delete(completedTaskIndex);
    case ADD_TASK:
      return state.push(action.task);
    default:
      return List<TaskModel>(state);
  }
}
