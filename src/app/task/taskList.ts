import {Component, Inject, ChangeDetectionStrategy, OnDestroy} from 'angular2/core';

import {tokenNotExpired} from 'angular2-jwt';

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
  providers: [TaskService],
  directives: [Task, TaskForm],
  styles: [require('./taskList.css')],
  template: require('./taskList.html')
})
export class TaskList implements OnDestroy {

  private unsubscribe: Function;
  private taskList: List<TaskModel>;
  private actions: typeof TaskActions;

  constructor( @Inject('ngRedux') ngRedux, private taskService: TaskService) {
    this.unsubscribe = ngRedux.connect(this.mapStateToThis, this.mapDispatchToThis)(this);
  }

  ngOnInit() {
    // Mock data for now
    let taskModel1 =
      new TaskModel(
        {
          id: this.guid(), title: 'Clean floor',
          details: 'Do everyday', completed: true,
          completedDate: new Date()
        }
      );
    let taskModel2 = new TaskModel({ id: this.guid(), title: 'Wash car' });
    let taskModelList = List<TaskModel>([taskModel1, taskModel2])
      .sortBy(tm => tm.dueDate)
      .toList();

    // Need to load once backend is up.
    this.actions.load(taskModelList);
  }

  loggedIn() {
    return tokenNotExpired();
  }

  taskUpdated(event: TaskUpdatedEvent) {
    console.log(event);
    // TODO: Call api to update task

    // TODO: See if we can break up all the different calls

    if (event.completed !== undefined) {
      this.actions.completeTask(event.id);
    }
  }

  addTask(event: TaskUpdatedEvent) {
    console.log(event);

    // TODO: Call api to create new task

    this.actions.addTask(new TaskModel({
      id: this.guid(),
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

  // Randomize guid temporary until we wire up backend
  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
}
