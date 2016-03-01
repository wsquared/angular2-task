import {Component, Input, Output, ChangeDetectionStrategy, EventEmitter} from 'angular2/core';
import {FORM_PROVIDERS} from 'angular2/common';

import {TaskModel} from './taskModel';

import {Collapse} from 'ng2-bootstrap';

import TaskCompletedEvent from './TaskCompletedEvent';

@Component({
  selector: 'task',
  providers: [],
  directives: [Collapse],
  pipes: [],
  styles: [require('./task.css')],
  template: require('./task.html'),
  inputs: ['task'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Task {

  @Input() task;
  @Output() taskCompleted = new EventEmitter<TaskCompletedEvent>();
  private isCollapsed: boolean = false;
  private completed: boolean;

  constructor() {
  }

  completeTask() {
    this.taskCompleted.emit({ id: this.task.id });
  }

}
