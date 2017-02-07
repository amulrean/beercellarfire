import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import {DrankRecord} from './beer';


@Component({
  selector: 'beer-list-drank-record',
  template: `
 <div fxLayout="row" fxLayoutAlign="start center">
  <div fxFlex="20%" fxLayoutAlign="start center">
     <md-icon>local_drink</md-icon>
  </div>
  <div fxFlex="80%" fxLayout="row" fxLayoutAlign="space-between center">
      <h3 fxFlex="20%">{{record.beer.name}}</h3>
      <p fxFlex="20%">{{record.beer.breweries[0].name}}</p>
      <p fxFlex="20%">{{record.drankDate | date:'medium' }}</p>
      <div>
        <button md-mini-fab>
          <md-icon>edit</md-icon>
        </button>
        <button md-mini-fab>
          <md-icon>delete</md-icon>
        </button>
      </div>
      <div>
        <button md-mini-fab color="warn" (click)="drinkRecord()">
          <md-icon>check_box</md-icon>
        </button>
      </div>
  </div>
</div>
  `,
  styles: [`
  `],
  providers: []
})
export class BeerListDrankRecordComponent implements OnInit {

  @Input() record: DrankRecord;


  constructor() {
  }

  ngOnInit() {
  }


}
