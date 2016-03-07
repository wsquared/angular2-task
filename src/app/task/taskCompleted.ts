import {Component, Input, ChangeDetectionStrategy} from 'angular2/core';

import {TaskModel} from './taskModel';

import * as moment from 'moment';

@Component({
  selector: 'taskCompleted',
  template: require('./taskCompleted.html'),
  inputs: ['taskCompleted'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskCompleted {

  @Input() taskCompleted: TaskModel;

  constructor() { }

  getDueDate(): string {
    return this.taskCompleted.dueDate
      ? moment(this.taskCompleted.dueDate).format('DD/MM/YYYY') : '-';
  }

  getCompletedDate(): string {
    return this.taskCompleted.completedDate
      ? moment(this.taskCompleted.completedDate).format('Do MMM YYYY, h:mm:ss a') : '-';
  }
}
