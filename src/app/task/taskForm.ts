import {
Component,
Inject,
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
import {ToastsManager} from 'ng2-toastr/ng2-toastr'

import {tokenNotExpired} from 'angular2-jwt';

import {Task} from './Task';
import {TaskModel} from './taskModel';
import TaskUpdatedEvent from './taskUpdatedEvent';

import {TaskService} from './TaskService';

import * as moment from 'moment';
import {DATEPICKER_DIRECTIVES} from 'ng2-bootstrap';

@Component({
  selector: 'taskForm',
  providers: [FORM_PROVIDERS, TaskService, ToastsManager],
  directives: [FORM_DIRECTIVES, DATEPICKER_DIRECTIVES],
  styles: [require('./taskForm.css')],
  template: require('./taskForm.html')
})
export class TaskForm {

  @Output() addTask: EventEmitter<TaskUpdatedEvent> = new EventEmitter<TaskUpdatedEvent>();
  private form: ControlGroup;
  private title: Control;
  private details: string;
  private dueDate: Date = moment(new Date()).toDate();
  private showDatePicker: boolean = false;

  constructor
    (
    private builder: FormBuilder,
    private taskService: TaskService,
    private toastr: ToastsManager
    ) { }

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
    this.taskService
      .createNewTask(new TaskModel({
        id: this.guid(),
        title: this.title.value,
        details: this.details,
        dueDate: this.dueDate ? this.dueDate : new Date(),
        completed: false,
      }))
      .subscribe(
      res => {
        let serializedTaskModel = (res.json())
          .map(
          (taskModel: any) =>
            new TaskModel
              ({
                id: taskModel.id, title: taskModel.title, details: taskModel.details,
                dueDate: taskModel.dueDate, completedDate: taskModel.completedDate
              })
          );
        this.addTask.emit(
          {
            id: serializedTaskModel.id,
            title: serializedTaskModel.title,
            details: serializedTaskModel.details,
            dueDate: serializedTaskModel.dueDate,
            completed: false,
            completedDate: serializedTaskModel.completedDate
          });
        this.toastr.success('Created new task!');
      },
      err => {
        this.toastr.error('This is not good!', 'Oops!' + err);
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

  // Randomize guid temporary until we wire up backend
  private guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
}
