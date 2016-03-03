import {Component, Input, Output, ChangeDetectionStrategy, EventEmitter} from 'angular2/core';
import {FORM_PROVIDERS, FORM_DIRECTIVES} from 'angular2/common';

import {TaskModel} from './taskModel';

import {Collapse, DATEPICKER_DIRECTIVES} from 'ng2-bootstrap';

import * as moment from 'moment';
import TaskUpdatedEvent from './taskUpdatedEvent';

@Component({
  selector: 'task',
  providers: [FORM_PROVIDERS],
  directives: [Collapse, FORM_DIRECTIVES, DATEPICKER_DIRECTIVES],
  pipes: [],
  styles: [require('./task.css')],
  template: require('./task.html'),
  inputs: ['task'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Task {

  @Input() task: TaskModel;
  @Output() taskUpdated = new EventEmitter<TaskUpdatedEvent>();
  private isCollapsed: boolean = false;
  private completed: boolean;
  private showDatePicker: boolean = false;
  private dueDate: Date;

  constructor() {
  }

  completeTask(event: Event) {
    this.taskUpdated.emit({ id: this.task.id, completed: true });
  }

  getDate(): string {
    if (!this.dueDate) {
      return this.task.dueDate ? moment(this.task.dueDate).format('DD/MM/YYYY') : '-';
    };
    return moment(this.dueDate).format('DD/MM/YYYY');
  }

  getCompletedDate(): string {
    return this.task.completedDate ? moment(this.task.completedDate).format('DD/MM/YYYY') : '-';
  }
}
