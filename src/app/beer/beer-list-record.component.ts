import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import {CellarRecord} from './beer';


@Component({
  selector: 'beer-list-record',
  template: `
 <div fxLayout="row" fxLayoutAlign="start center">
  <div fxFlex="20%" fxLayoutAlign="start center">
     <md-icon>local_drink</md-icon>
  </div>
  <div fxFlex="80%" fxLayout="row" fxLayoutAlign="space-between center">
      <h3 fxFlex="20%">{{record.beer.name}}</h3>
      <p fxFlex="20%">{{record.beer.breweries[0].name}}</p>
      <p fxFlex="20%">{{record.count}}</p>
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
export class BeerListRecordComponent implements OnInit {

  @Input() record: CellarRecord;

  @Output() onDrinkRecord = new EventEmitter<CellarRecord>();


  constructor() {
  }

  ngOnInit() {
  }

  drinkRecord() {
      this.onDrinkRecord.emit(this.record);
  }

}
