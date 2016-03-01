import {Component, Inject, ChangeDetectionStrategy, OnDestroy} from 'angular2/core';
import {
FORM_DIRECTIVES,
FORM_PROVIDERS,
Control,
ControlGroup,
Validators,
NgFormModel,
FormBuilder
} from 'angular2/common';

import {tokenNotExpired} from 'angular2-jwt';

import {Task} from './Task';
import {TaskModel} from './taskModel';
import {List} from 'immutable';
import {bindActionCreators} from 'redux';
import * as TaskActions from '../actions/taskAction';

import * as moment from 'moment';
import {DATEPICKER_DIRECTIVES} from 'ng2-bootstrap';

@Component({
  selector: 'taskForm',
  providers: [FORM_PROVIDERS],
  directives: [FORM_DIRECTIVES, DATEPICKER_DIRECTIVES],
  styles: [require('./taskForm.css')],
  template: require('./taskForm.html'),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskForm implements OnDestroy {

  private unsubscribe: Function;
  private actions: typeof TaskActions;
  private form: ControlGroup;
  private title: Control;
  private details: Control;
  private dueDate: Date = moment(new Date()).toDate();
  private showDatePicker: boolean = false;

  constructor( @Inject('ngRedux') ngRedux, private builder: FormBuilder) {
    this.unsubscribe = ngRedux.connect(this.mapStateToThis, this.mapDispatchToThis)(this);
    this.title = new Control('', Validators.required);
    this.details = new Control('', Validators.required);
    this.form = builder.group({
      title: this.title,
      details: this.details,
      dueDate: this.dueDate
    });
  }

  add() {
    if (!this.form.valid) return;
    this.actions.addTask(new TaskModel({
      title: this.title.value,
      details: this.details.value,
      dueDate: this.dueDate ? this.dueDate : new Date(),
      completed: false,
    }));
    // No form reset feature yet unfortunately.
    this.title.updateValue('');
    this.details.updateValue('');
    this.dueDate = new Date();
  }

  getDate() {
    return moment(this.dueDate).format('DD/MM/YYYY');
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
