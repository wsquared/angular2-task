import {Component, Inject, ChangeDetectionStrategy, OnDestroy} from 'angular2/core';
import {tokenNotExpired} from 'angular2-jwt';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';

import {TaskCompleted} from './taskCompleted';
import {TaskService} from './TaskService';
import {TaskModel} from './taskModel';

import {List} from 'immutable';
import {bindActionCreators} from 'redux';
import * as TaskCompletedActions from '../actions/taskCompletedAction';

@Component({
  selector: 'taskCompletedList',
  providers: [TaskService, ToastsManager],
  directives: [TaskCompleted],
  template: require('./taskCompletedList.html')
})
export class TaskCompletedList implements OnDestroy {

  private unsubscribe: Function;
  private taskCompletedList: List<TaskModel>;
  private actions: typeof TaskCompletedActions;

  constructor
    ( @Inject('ngRedux') ngRedux, private taskService: TaskService, private toastr: ToastsManager) {
    this.unsubscribe = ngRedux.connect(this.mapStateToThis, this.mapDispatchToThis)(this);
  }

  ngOnInit() {
    this.toastr.info('Completed tasks are readonly for all users');
    this.taskService
      .getCompletedTasks()
      .subscribe(
      res => {
        let serializedTaskCompletedList = (<List<TaskModel>>res.json())
          .map(
          (taskModel: any) =>
            new TaskModel
              ({
                id: taskModel.id, title: taskModel.title, details: taskModel.details,
                dueDate: taskModel.dueDate, completedDate: taskModel.completedDate
              })
        );
        this.taskCompletedList = List<TaskModel>(serializedTaskCompletedList);
        this.actions.load(this.taskCompletedList);
        this.toastr.success('Completed task list loaded!');
      },
      err => {
        this.toastr.error('This is not good!', 'Oops!' + err);
      }
      );
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  mapStateToThis(state) {
    return {
      taskList: state.taskCompletedList
    };
  }

  mapDispatchToThis(dispatch) {
    return { actions: bindActionCreators(TaskCompletedActions, dispatch) };
  }
}
