import {Component} from 'angular2/core';

@Component({
  selector: 'home',  // <home></home>
  styles: [require('./home.css')],
  template: require('./home.html')
})
export class Home {

  constructor() { }

  ngOnInit() { }

}
