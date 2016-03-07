import {Component, Inject, ChangeDetectionStrategy, OnDestroy} from 'angular2/core';
import {tokenNotExpired} from 'angular2-jwt';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';

import {Task} from './Task';
import {TaskService} from './TaskService';

import {TaskForm} from './TaskForm';
import {TaskModel} from './taskModel';

import {List} from 'immutable';
import {bindActionCreators} from 'redux';
import * as TaskActions from '../actions/taskAction';

import TaskUpdatedEvent from './taskUpdatedEvent';

@Component({
  selector: 'taskList',
  providers: [TaskService, ToastsManager],
  directives: [Task, TaskForm],
  styles: [require('./taskList.css')],
  template: require('./taskList.html')
})
export class TaskList implements OnDestroy {

  private unsubscribe: Function;
  private taskList: List<TaskModel>;
  private actions: typeof TaskActions;

  constructor
    ( @Inject('ngRedux') ngRedux, private taskService: TaskService, private toastr: ToastsManager) {
    this.unsubscribe = ngRedux.connect(this.mapStateToThis, this.mapDispatchToThis)(this);
  }

  ngOnInit() {
    this.taskService
      .getTasks()
      .subscribe
      (
      res => {
        let serializedTaskList = (<List<TaskModel>>res.json())
          .map(
          (taskModel: any) =>
            new TaskModel
              ({
                id: taskModel.id, title: taskModel.title, details: taskModel.details,
                dueDate: taskModel.dueDate, completedDate: taskModel.completedDate
              })
          );
        this.taskList = List<TaskModel>(serializedTaskList);
        this.actions.load(this.taskList);
        this.toastr.success('Todo list loaded!');
      },
      err => {
        this.toastr.error('This is not good!', 'Oops!' + err);
      }
      );
  }

  loggedIn() {
    return tokenNotExpired();
  }

  taskUpdated(event: TaskUpdatedEvent) {
    if (event.completed !== undefined) {
      this.actions.completeTask(event.id);
    } else {
      this.actions.updateTask(new TaskModel({
        id: event.id,
        title: event.title,
        details: event.details,
        dueDate: event.dueDate,
        completed: event.completed,
        completedDate: event.completedDate
      }));
    }
  }

  addTask(event: TaskUpdatedEvent) {
    this.actions.addTask(new TaskModel({
      id: event.id,
      title: event.title,
      details: event.details,
      dueDate: event.dueDate,
      completed: false,
    }));
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  mapStateToThis(state) {
    return {
      taskList: state.taskList
    };
  }

  mapDispatchToThis(dispatch) {
    return { actions: bindActionCreators(TaskActions, dispatch) };
  }
}
