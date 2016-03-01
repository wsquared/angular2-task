import {Component, Inject, ChangeDetectionStrategy, OnDestroy} from 'angular2/core';

import {tokenNotExpired} from 'angular2-jwt';

import {Task} from './Task';
import {TaskForm} from './TaskForm';
import {TaskModel} from './taskModel';
import {List} from 'immutable';
import {bindActionCreators} from 'redux';
import * as TaskActions from '../actions/taskAction';

import TaskCompletedEvent from './taskCompletedEvent';

@Component({
  selector: 'taskList',
  directives: [Task, TaskForm],
  styles: [require('./taskList.css')],
  template: require('./taskList.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskList implements OnDestroy {

  private unsubscribe: Function;
  private taskList: List<TaskModel>;
  private actions: typeof TaskActions;

  constructor( @Inject('ngRedux') ngRedux) {
    this.unsubscribe = ngRedux.connect(this.mapStateToThis, this.mapDispatchToThis)(this);
  }

  loggedIn() {
    return tokenNotExpired();
  }

  taskCompleted(event: TaskCompletedEvent) {
    this.actions.completeTask(event.id);
  }

  ngOnInit() {
    // Mock data for now
    let taskModel1 = new TaskModel({ title: 'Clean floor' });
    let taskModel2 = new TaskModel({ title: 'Wash car' });
    let taskModelList = List<TaskModel>([taskModel1, taskModel2]);

    // Need to load once backend is up.
    this.actions.load(taskModelList);
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
