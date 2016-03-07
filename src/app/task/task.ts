import {Component, Input, Output, ChangeDetectionStrategy, EventEmitter} from 'angular2/core';
import {FORM_PROVIDERS, FORM_DIRECTIVES} from 'angular2/common';

import {TaskModel} from './taskModel';
import {TaskService} from './TaskService';

import {Collapse, DATEPICKER_DIRECTIVES} from 'ng2-bootstrap';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';

import * as moment from 'moment';
import TaskUpdatedEvent from './taskUpdatedEvent';
import TaskCompletedEvent from './taskCompletedEvent';

import {tokenNotExpired} from 'angular2-jwt';

@Component({
  selector: 'task',
  providers: [FORM_PROVIDERS, TaskService, ToastsManager],
  directives: [FORM_DIRECTIVES, DATEPICKER_DIRECTIVES, Collapse],
  template: require('./task.html'),
  inputs: ['task'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Task {

  @Input() task: TaskModel;
  @Output() taskUpdated: EventEmitter<TaskUpdatedEvent> = new EventEmitter<TaskUpdatedEvent>();
  @Output() taskCompleted: EventEmitter<TaskCompletedEvent> =
  new EventEmitter<TaskCompletedEvent>();
  private isCollapsed: boolean = false;
  private completed: boolean;
  private canEditCompleted: boolean = false;
  private dueDate: Date;
  private canEditDueDate: boolean = false;
  private details: string;
  private canEditDetails: boolean = false;
  private title: string;
  private canEditTitle: boolean = false;

  constructor(private taskService: TaskService, private toastr: ToastsManager) {
  }

  ngOnInit() {
    this.title = this.task.title;
    this.details = this.task.details;
    this.completed = this.task.completed;
  }

  completeTask(event: Event): void {
    // Check logged in
    if (!this.loggedIn()) {
      this.toastr.error('You are not authorized to do this');
      return;
    }

    this.taskService
      .updateToComplete(this.task.id)
      .subscribe(
      res => {
        this.toastr.success('Congrats you completed your task!');

        // emit to be dispatched
        this.taskCompleted.emit({ id: this.task.id });

        // reset permissions
        this.canEditCompleted = !this.canEditCompleted;
      },
      err => {
        this.toastr.error('This is not good!', 'Oops!' + err);
        this.canEditCompleted = !this.canEditCompleted;
      }
      );
  }

  editDueDate(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    // Check logged in
    if (!this.loggedIn()) {
      this.toastr.error('You are not authorized to do this');
      return;
    }
    this.canEditDueDate = !this.canEditDueDate;
  }

  updateDueDate(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    // check permissions
    if (!this.loggedIn()) {
      this.toastr.error('You are not authorized to do this');
      return;
    }

    // run update due date
    this.taskService
      .updateTask(new TaskModel({
        id: this.task.id,
        title: this.task.title,
        details: this.task.details,
        dueDate: this.dueDate,
        completed: this.task.completed,
        completedDate: this.task.completedDate
      }))
      .subscribe
      (
      res => {
        // emit to be dispatched
        this.taskUpdated.emit({
          id: this.task.id,
          title: this.task.title,
          details: this.task.details,
          completed: this.task.completed,
          dueDate: this.dueDate,
          completedDate: this.task.completedDate
        });

        this.toastr.success('Due date updated for: ' + this.task.title);
        // reset permissions
        this.canEditDueDate = !this.canEditDueDate;
      },
      err => {
        this.toastr.error('This is not good!', 'Oops!' + err);
        this.canEditDueDate = !this.canEditDueDate;
      }
      );
  }

  editDetails(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    // check permissions
    if (!this.loggedIn()) {
      this.toastr.error('You are not authorized to do this');
      return;
    }

    this.canEditDetails = !this.canEditDetails;
  }

  updateDetails(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    // check permissions
    if (!this.loggedIn()) {
      this.toastr.error('You are not authorized to do this');
      return;
    }

    // run updateDetails
    this.taskService
      .updateTask(new TaskModel({
        id: this.task.id,
        title: this.task.title,
        details: this.details,
        dueDate: this.task.dueDate,
        completed: this.task.completed,
        completedDate: this.task.completedDate
      }))
      .subscribe
      (
      res => {
        // emit to be dispatched
        this.taskUpdated.emit({
          id: this.task.id,
          title: this.task.title,
          details: this.details,
          completed: this.task.completed,
          dueDate: this.task.dueDate,
          completedDate: this.task.completedDate
        });

        this.toastr.success('Details updated for: ' + this.task.title);
        // reset permissions
        this.taskUpdated.emit({ id: this.task.id, details: this.details });

        // reset permissions
        this.canEditDetails = !this.canEditDetails;
      },
      err => {
        this.toastr.error('This is not good!', 'Oops!' + err);
        this.canEditDetails = !this.canEditDetails;
      }
      );
  }

  editTitle(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    // check permissions
    if (!this.loggedIn()) {
      this.toastr.error('You are not authorized to do this');
      return;
    }
    // Go
    this.canEditTitle = !this.canEditTitle;
  }

  updateTitle(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    // check permissions
    if (!this.loggedIn()) {
      this.toastr.error('You are not authorized to do this');
      return;
    }
    // run updateTitle
    this.taskService
      .updateTask(new TaskModel({
        id: this.task.id,
        title: this.title,
        details: this.details,
        dueDate: this.task.dueDate,
        completed: this.task.completed,
        completedDate: this.task.completedDate
      }))
      .subscribe
      (
      res => {
        // emit to be dispatched
        this.taskUpdated.emit({
          id: this.task.id,
          title: this.title,
          details: this.task.details,
          completed: this.task.completed,
          dueDate: this.task.dueDate,
          completedDate: this.task.completedDate
        });

        this.toastr.success('Title updated for: ' + this.task.title);
        // reset permissions
        this.taskUpdated.emit({ id: this.task.id, title: this.title });

        // reset permissions
        this.canEditTitle = !this.canEditTitle;
      },
      err => {
        this.toastr.error('This is not good!', 'Oops!' + err);
        this.canEditTitle = !this.canEditTitle;
      }
      );
  }

  loggedIn() {
    return tokenNotExpired();
  }

  getDetails(): string {
    return this.task.details ? this.task.details : '-';
  }

  getDueDate(): string {
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
