import {Component, Input, ChangeDetectionStrategy} from 'angular2/core';
import {FORM_PROVIDERS} from 'angular2/common';
import {TaskModel} from './taskModel';

@Component({
  selector: 'task',  // <task></task>
  providers: [],
  directives: [],
  pipes: [],
  styles: [require('./task.css')],
  template: require('./task.html'),
  inputs: ['task'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Task {

  // TypeScript public modifiers
  constructor() {
  }

}
