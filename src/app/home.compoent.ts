import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-home',
  template: `
    <h2>Home:</h2>
    <p>You are home</p>
  `,
  styles: [],
  providers: []
})
export class HomeComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
