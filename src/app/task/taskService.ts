import { Http, Headers, RequestOptions, Response } from 'angular2/http';
import { Injectable } from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import {
CREATE_TASK,
GET_TASKS,
UPDATE_TASK,
DELETE_TASK
} from '../../../settings';

import { TaskModel } from './taskModel';

@Injectable()
export class TaskService {

  constructor(private http: Http) {
  }

  getTasks(): Observable<Response> {
    return this.http.get(GET_TASKS);
  }

  createNewTask(newTask: TaskModel): Observable<Response> {
    let jwt = localStorage.getItem('id_token');
    var authHeader = new Headers();
    if (jwt) {
      authHeader.append('Authorization', 'Bearer ' + jwt);
    }
    authHeader.append('Content-Type', 'application/json');
    return this.http.post(
      CREATE_TASK,
      JSON.stringify(newTask.toJS()),
      new RequestOptions({ headers: authHeader })
    );
  }

  updateTask(task: TaskModel): Observable<Response> {
    let jwt = localStorage.getItem('id_token');
    var authHeader = new Headers();
    if (jwt) {
      authHeader.append('Authorization', 'Bearer ' + jwt);
    }
    return this.http.put(
      UPDATE_TASK, JSON.stringify(task.toJS()),
      new RequestOptions({ headers: authHeader })
    );
  }
};
