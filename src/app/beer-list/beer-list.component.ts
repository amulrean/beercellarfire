import {Component, OnInit} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {Subject}           from 'rxjs/Subject';

import {BreweryService} from '../brewery.service';
import {Beer} from '../beer';


@Component({
  selector: 'app-beer-list',
  template: `
    <app-beer-new (onAddItem)="onAddItem($event)"></app-beer-new>

    <h2>You Current Cellar:</h2>
    
    <md-card *ngFor="let beer of beers | async" class="md-card">
      <md-card-subtitle *ngIf="beer.breweries && beer.breweries[0]">{{ beer.breweries[0].name }}</md-card-subtitle>
      <md-card-title>{{ beer.name }}</md-card-title>
      <md-card-content *ngIf="beer.style">{{ beer.style.name }}:{{ beer.abv }}%</md-card-content>
      <md-card-actions>
            <button md-button>EDIT</button>
            <button md-button (click)="deleteItem(beer.$key)">DELETE</button>
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

  beers: FirebaseListObservable<any>;
  private searchTerms = new Subject<string>();

  constructor(public af: AngularFire) {
  }

  ngOnInit() {
    this.beers = this.af.database.list('/beers');
  }

  onAddItem(beer: Beer) {
    this.beers.push(beer);
  }

  deleteItem(key: string) {
    this.beers.remove(key);
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  gotoDetail(beer: Beer): void {
    // let link = ['/detail', hero.id];
    // this.router.navigate(link);
  }

}
