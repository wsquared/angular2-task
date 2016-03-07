/*
 * Vendors
 */

import 'jquery';
import 'font-awesome-webpack';

/*
 * Providers provided by Angular
 */
import * as ngCore from 'angular2/core';
import * as browser from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS, Http} from 'angular2/http';

import configureStore from './app/stores/configureStore';
const provider = require('ng2-redux').provider;
const store = configureStore();

let options = {
  autoDismiss: true,
  positionClass: 'toast-top-right',
  toastLife: '2000'
};

/*
 * Auth0
 */
import {AuthHttp, AuthConfig} from 'angular2-jwt';

/*
 * Toastr
 */
import {ToastOptions} from 'ng2-toastr/ng2-toastr';

/*
 * App Environment Providers
 * providers that only live in certain environment
 */
const ENV_PROVIDERS = [];

if ('production' === process.env.ENV) {
  ngCore.enableProdMode();
  ENV_PROVIDERS.push(browser.ELEMENT_PROBE_PROVIDERS_PROD_MODE);
} else {
  ENV_PROVIDERS.push(browser.ELEMENT_PROBE_PROVIDERS);
}

/*
 * App Component
 * our top level component that holds all of our components
 */
import {App} from './app/app';

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
export function main() {
  return browser.bootstrap(App, [
    ...ENV_PROVIDERS,
    ...HTTP_PROVIDERS,
    ...ROUTER_PROVIDERS,
    ngCore.provide(AuthHttp, {
      useFactory: (http) => {
        return new AuthHttp(new AuthConfig(), http);
      },
      deps: [Http]
    }),
    ngCore.provide(LocationStrategy, { useClass: HashLocationStrategy }),
    provider(store),
    ngCore.provide(ToastOptions, { useValue: new ToastOptions(options) })
  ])
  .catch(err => console.error(err));
}

/*
 * Vendors
 * For vendors for example jQuery, Lodash, angular2-jwt just import them anywhere in your app
 * Also see custom_typings.d.ts as you also need to do `typings install x` where `x` is your module
 */


/*
 * Hot Module Reload
 * experimental version by @gdi2290
 */
if ('development' === process.env.ENV) {
  // activate hot module reload
  if ('hot' in module) {
    if (document.readyState === 'complete') {
      main();
    } else {
      document.addEventListener('DOMContentLoaded', main);
    }
    module.hot.accept();
  }

} else {
  // bootstrap after document is ready
  document.addEventListener('DOMContentLoaded', main);
}

