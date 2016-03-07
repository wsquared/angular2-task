import {Component, Inject, ChangeDetectionStrategy, OnDestroy} from 'angular2/core';
import {Router} from 'angular2/router';
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
import TaskCompletedEvent from './taskCompletedEvent';

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
    (
    @Inject('ngRedux') ngRedux,
    private taskService: TaskService,
    private toastr: ToastsManager,
    private router: Router
    ) {
    this.unsubscribe = ngRedux.connect(this.mapStateToThis, this.mapDispatchToThis)(this);
  }

  ngOnInit() {
    this.taskService
      .getTasks()
      .map(response => response.json())
      .subscribe
      (
      res => {
        this.taskList = List<TaskModel>(res);
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
    this.actions.updateTask(new TaskModel({
      id: event.id,
      title: event.title,
      details: event.details,
      dueDate: event.dueDate,
      completed: event.completed,
      completedDate: event.completedDate
    }));
  }

  taskCompleted(event: TaskCompletedEvent) {
    this.actions.completeTask(event.id);
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
