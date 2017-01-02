import {Component, OnInit} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Subject}           from 'rxjs/Subject';

import {BreweryService} from './brewery.service';
import {Beer, CellarRecord} from './beer';


@Component({
  selector: 'app-beer-list',
  template: `
    <app-beer-new (onAddItem)="onAddItem($event)"></app-beer-new>

    <h2>You Current Cellar:</h2>
    
    <md-card *ngFor="let record of cellarRecords | async" class="md-card">
      <md-card-subtitle *ngIf="record.beer.breweries && record.beer.breweries[0]">{{ record.beer.breweries[0].name }}</md-card-subtitle>
      <md-card-title>{{ record.beer.name }}</md-card-title>
      <md-card-content *ngIf="record.beer.style">{{ record.beer.style.name }}:{{ record.beer.abv }}%</md-card-content>
      <md-card-actions>
            <button md-button>EDIT</button>
            <button md-button (click)="deleteItem(record.$key)">DELETE</button>
       </md-card-actions>
    </md-card>
  `,
  styles: [`
    .md-card {
      margin: 20px;
    }
  `],
  providers: [BreweryService]
})
export class BeerListComponent implements OnInit {

  cellarRecords: FirebaseListObservable<any>;
  private searchTerms = new Subject<string>();

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

  deleteItem(key: string) {
    this.cellarRecords.remove(key);
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  gotoDetail(beer: Beer): void {
    // let link = ['/detail', hero.id];
    // this.router.navigate(link);
  }

}
