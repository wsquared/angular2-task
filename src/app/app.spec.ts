// import {
// describe,
// expect,
// it,
// inject,
// beforeEachProviders
// } from 'angular2/testing';

// import * as ngCore from 'angular2/core';

// import {Response} from 'angular2/http';

// import {Observable} from 'rxjs/Observable';
// import {Subject} from 'rxjs/Subject';

// let resp$: Observable<Response> = new Subject();

// import {AuthHttp, AuthConfig} from 'angular2-jwt';

// // Load the implementations that should be tested
// import {App} from './app';

// describe('App', () => {
//   // provide our implementations or mocks to the dependency injector
//   beforeEachProviders(() => [
//     App,
//     ngCore.provide(AuthHttp, {
//       useValue: {
//         // Note that the params and method name must match something that exists in AuthHttp
//         get: (url: string) => {
//           return resp$;
//         }
//       }
//     }),
//   ]);

//   it('logout should remove storage item', inject([App], (app) => {
//     spyOn(localStorage, 'removeItem');

//     app.logout();

//     expect(localStorage.removeItem).toHaveBeenCalled();
//   }));

// });
