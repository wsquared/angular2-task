import {List} from 'immutable';
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
      return List<TaskModel>(state);
    case UPDATE_TASK:
      let index = state.findIndex((task) => task.id === action.task.id);
      let updateTask: TaskModel = state.get(index);
      return state.set(
        index,
        new TaskModel({
          id: updateTask.id,
          title: updateTask.title,
          details: updateTask.details,
          dueDate: updateTask.dueDate,
          completed: updateTask.completed,
          completedDate: updateTask.completedDate
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
