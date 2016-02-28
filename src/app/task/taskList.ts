import {Component, Inject} from 'angular2/core';
import {FORM_PROVIDERS} from 'angular2/common';

import {tokenNotExpired} from 'angular2-jwt';

import {Task} from './Task';
import {List} from 'immutable';
import {bindActionCreators} from 'redux';
import * as TaskActions from '../actions/taskAction';

@Component({
  selector: 'taskList',  // <task></task>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [
    Task
  ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [require('./taskList.css')],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./taskList.html')
})
export class TaskList {

  protected unsubscribe: Function;
  private tasks: Array<string>;

  // TypeScript public modifiers
  constructor( @Inject('ngRedux') ngRedux) {
    this.unsubscribe = ngRedux.connect(this.mapStateToThis, this.mapDispatchToThis)(this);
  }

  loggedIn() {
    return tokenNotExpired();
  }

  ngOnInit() {
    this.tasks = ['hello', 'world']
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
