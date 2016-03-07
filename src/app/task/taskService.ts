import {Http, Headers, RequestOptions, Response} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {
CREATE_TASK,
GET_TASKS,
UPDATE_TASK,
GET_COMPLETED_TASKS
} from '../../../settings';

import { TaskModel } from './taskModel';

@Injectable()
export class TaskService {

  constructor(private http: Http) {
  }

  getTasks(): Observable<Response> {
    return this.http.get(GET_TASKS);
  }

  getCompletedTasks(): Observable<Response> {
    return this.http.get(GET_COMPLETED_TASKS);
  }

  createNewTask(newTask: TaskModel): Observable<Response> {
    let jwt = localStorage.getItem('id_token');
    var authHeader = new Headers();
    let task = JSON.stringify(newTask.toJS());

    authHeader.append('Content-Type', 'application/json');

    if (jwt) {
      authHeader.append('Authorization', 'Bearer ' + jwt);
    }

    return this.http.post(CREATE_TASK, task, new RequestOptions({ headers: authHeader }));
  }

  updateTask(task: TaskModel): Observable<Response> {
    let jwt = localStorage.getItem('id_token');

    var authHeader = new Headers();
    authHeader.append('Content-Type', 'application/json');

    if (jwt) {
      authHeader.append('Authorization', 'Bearer ' + jwt);
    }

    return this.http.put(
      UPDATE_TASK, JSON.stringify(task.toJS()),
      new RequestOptions({ headers: authHeader })
    );
  }

  updateToComplete(id: string): Observable<Response> {
    let jwt = localStorage.getItem('id_token');

    var authHeader = new Headers();
    authHeader.append('Content-Type', 'application/json');

    if (jwt) {
      authHeader.append('Authorization', 'Bearer ' + jwt);
    }
    return this.http.put(
      UPDATE_TASK + '/' + id + '/complete', '',
      new RequestOptions({ headers: authHeader }));
  }

};
