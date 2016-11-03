import { Component, OnInit } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { Subject }           from 'rxjs/Subject';

import { BreweryService } from '../brewery.service';
import { Beer } from '../beer';


@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.css'],
  providers: [BreweryService]
})
export class BeerListComponent implements OnInit {

  beers: FirebaseListObservable<any>;
  private searchTerms = new Subject<string>();

  constructor(
    public af: AngularFire
  ) {}

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
