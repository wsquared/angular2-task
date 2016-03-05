import {
Component,
Inject,
ChangeDetectionStrategy,
EventEmitter,
Output} from 'angular2/core';
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
import TaskUpdatedEvent from './taskUpdatedEvent';

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
export class TaskForm {

  @Output() addTask: EventEmitter<TaskUpdatedEvent> = new EventEmitter<TaskUpdatedEvent>();
  private form: ControlGroup;
  private title: Control;
  private details: string;
  private dueDate: Date = moment(new Date()).toDate();
  private showDatePicker: boolean = false;

  constructor(private builder: FormBuilder) {  }

  ngOnInit() {
    this.title = new Control('', Validators.required);
    this.details = '';
    this.form = this.builder.group({
      title: this.title,
      details: this.details,
      dueDate: this.dueDate
    });
  }

  add() {
    if (!this.form.valid) return;
    // TODO: Call to api end point to save

    this.addTask.emit(
      {
        id: '',
        title: this.title.value,
        details: this.details,
        dueDate: this.dueDate ? this.dueDate : new Date(),
        completed: false,
      }
    );

    // No form reset feature yet unfortunately, so we can just set to clear values
    // but the ngDirty and ngInvalid will still exist.
    this.title.updateValue('');
    this.details = '';
    this.dueDate = new Date();
  }

  getDate() {
    return moment(this.dueDate).format('DD/MM/YYYY');
  }
}
