import {Component, Input} from 'angular2/core';
import {FORM_PROVIDERS} from 'angular2/common';
import {TaskModel} from './taskModel';

@Component({
  selector: 'task',  // <task></task>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    // ...FORM_PROVIDERS,
  ],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [

  ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [require('./task.css')],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./task.html')
})
export class Task {

  @Input() task: TaskModel;

  // TypeScript public modifiers
  constructor() {

  }

}
