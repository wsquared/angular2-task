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
  styles: [require('./task.css')],
  template: require('./task.html'),
  inputs: ['task'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Task {

  @Input() task: TaskModel;
  @Output() taskUpdated: EventEmitter<TaskUpdatedEvent> = new EventEmitter<TaskUpdatedEvent>();
  private isCollapsed: boolean = false;
  private completed: boolean;
  private canEditCompleted: boolean = false;
  private dueDate: Date;
  private canEditDueDate: boolean = false;
  private details: string;
  private canEditDetails: boolean = false;
  private title: string;
  private canEditTitle: boolean = false;

  constructor() {
  }

  ngOnInit() {
    this.title = this.task.title;
    this.details = this.task.details;
    this.completed = this.task.completed;
  }

  completeTask(event: Event): void {
    // check permissions

    // run complete task

    // emit to be dispatched
    this.taskUpdated.emit({ id: this.task.id, completed: true });

    // reset permissions
    this.canEditCompleted = !this.canEditCompleted;
  }

  editDueDate(event: Event): void {
    // check permissions
    this.canEditDueDate = !this.canEditDueDate;
  }


  updateDueDate(event: Event): void {
    // check permissions

    // run update due date

    // emit to be dispatched
    this.taskUpdated.emit({ id: this.task.id, dueDate: moment(this.dueDate).toDate() });

    // reset permissions
    this.canEditDueDate = !this.canEditDueDate;
  }

  editDetails(event: Event): void {
    // check permissions
    this.canEditDetails = !this.canEditDetails;
  }

  updateDetails(event: Event): void {
    // check permissions

    // run updateDetails

    // emit to be dispatched
    this.taskUpdated.emit({ id: this.task.id, details: this.details });

    // reset permissions
    this.canEditDetails = !this.canEditDetails;
  }

  editTitle(event: Event): void {
    // check permissions

    // Go
    this.canEditTitle = !this.canEditTitle;
  }

  updateTitle(event: Event): void {
    // check permissions

    // run updateTitle

    // emit to be dispatched
    this.taskUpdated.emit({ id: this.task.id, title: this.title });

    // reset permissions
    this.canEditTitle = !this.canEditTitle;
  }

  getDate(): string {
    if (!this.dueDate) {
      return this.task.dueDate ? moment(this.task.dueDate).format('DD/MM/YYYY') : '-';
    };
    return moment(this.dueDate).format('DD/MM/YYYY');
  }

  getCompletedDate(): string {
    // TODO: Must be date and time
    return this.task.completedDate ? moment(this.task.completedDate).format('DD/MM/YYYY') : '-';
  }
}
