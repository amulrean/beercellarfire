import {Component, OnInit} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

import {CellarRecord, DrankRecord} from './beer';


@Component({
  selector: 'app-beer-list',
  template: `
    <app-beer-new (onAddItem)="onAddItem($event)"></app-beer-new>

    <h2>Your Cellar:</h2>
    <beer-list-record 
      *ngFor="let record of cellarRecords | async"
      [record]="record"
      (onDrinkRecord)="onDrinkRecord($event)"></beer-list-record>
      
    <h2>Drank Record:</h2>
    <beer-list-drank-record 
      *ngFor="let record of drankRecords | async"
      [record]="record"></beer-list-drank-record>
  `,
  styles: [`
  `],
  providers: []
})
export class BeerListComponent implements OnInit {

  cellarRecords: FirebaseListObservable<any>;
  drankRecords: FirebaseListObservable<any>;
  userUid: string;

  constructor(public af: AngularFire) {
  }

  ngOnInit() {
    this.userUid = this.af.auth.getAuth().auth.uid;


    this.cellarRecords = this.af.database.list('/cellarRecordsUid/' + this.userUid, {
      query: {
        orderByChild: 'count',
      }
    });

    this.drankRecords = this.af.database.list('/drankRecords', {
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

  onDrinkRecord(drankCellarRecord: CellarRecord) {

    drankCellarRecord.count  = drankCellarRecord.count -1;
    if (drankCellarRecord.count <= 0) {
      this.cellarRecords.remove(drankCellarRecord.$key);
    } else {
      this.cellarRecords.update(drankCellarRecord.$key, {count: drankCellarRecord.count});
    }

    let drankRecord = new DrankRecord(drankCellarRecord);
    this.drankRecords.push(drankRecord);

  }

  deleteItem(key: string) {
    this.cellarRecords.remove(key);
  }

}
