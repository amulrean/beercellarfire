import {Component, OnInit} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

import {CellarRecord} from './beer';


@Component({
  selector: 'app-beer-list',
  template: `
    <app-beer-new (onAddItem)="onAddItem($event)"></app-beer-new>

    <h2>Your Cellar:</h2>
    <beer-list-record 
      *ngFor="let record of cellarRecords | async"
      [record]="record"
      (onDrinkRecord)="onDrinkRecord($event)"></beer-list-record>
  `,
  styles: [`
  `],
  providers: []
})
export class BeerListComponent implements OnInit {

  cellarRecords: FirebaseListObservable<any>;

  constructor(public af: AngularFire) {
  }

  ngOnInit() {
    this.cellarRecords = this.af.database.list('/cellarRecords', {
      query: {
        orderByChild: 'ownerUid',
        equalTo: this.af.auth.getAuth().auth.uid
      }
    });
  }

  onAddItem(newRecord: CellarRecord) {
    newRecord.ownerUid = this.af.auth.getAuth().auth.uid;
    this.cellarRecords.push(newRecord);
  }

  onDrinkRecord(drankRecord: CellarRecord) {

    drankRecord.count  = drankRecord.count -1;
    if (drankRecord.count <= 0) {
      this.cellarRecords.remove(drankRecord.$key);
    } else {
      this.cellarRecords.update(drankRecord.$key, {count: drankRecord.count});
    }
  }

  deleteItem(key: string) {
    this.cellarRecords.remove(key);
  }

}
