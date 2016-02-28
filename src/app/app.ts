/*
 * Angular 2 decorators and services
 */

import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common';
import {Http} from 'angular2/http';

import {RouterActive} from './directives/router-active';
import {Home} from './home/home';
import {TaskList} from './task/taskList';

import {AuthHttp, tokenNotExpired, JwtHelper} from 'angular2-jwt';
import {AUTH0_CLIENT_ID, AUTH0_DOMAIN} from './auth0-variables';

// Global variable for Auth0
declare var Auth0Lock;

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  providers: [...FORM_PROVIDERS],
  directives: [...ROUTER_DIRECTIVES, RouterActive],
  pipes: [],
  styles: [require('./app.css')],
  template: require('./app.html')
})
@RouteConfig([
  { path: '/', component: Home, name: 'Home' },
  { path: '/tasks', component: TaskList, name: 'Tasks' },
  { path: '/**', redirectTo: ['Home'] }
])
export class App {

  lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN);
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private authHttp: AuthHttp) { }

  login() {
    this.lock.show((err: string, profile: string, id_token: string) => {

      if (err) {
        throw new Error(err);
      }
      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('id_token', id_token);
    });
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
  }

  loggedIn() {
    return tokenNotExpired();
  }
}
