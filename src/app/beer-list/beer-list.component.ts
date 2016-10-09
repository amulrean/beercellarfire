import { Component, OnInit } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import { Observable }        from 'rxjs/Observable';
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
  newBeer: Beer;
  beerSearchResults: Observable<Beer[]>;
  private searchTerms = new Subject<string>();

  constructor(
    public af: AngularFire,
    private breweryService: BreweryService
  ) {
    this.newBeer = new Beer();
  }

  ngOnInit() {
    this.beers = this.af.database.list('/beers');

    this.beerSearchResults = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.breweryService.searchBeer(term)
        // or the observable of empty heroes if no search term
        : Observable.of<Beer[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(error);
        return Observable.of<Beer[]>([]);
      });
  }

  addItem() {
    this.beers.push(this.newBeer);
    this.newBeer = new Beer();
  }

  updateItem(key: string, newBeer: Beer) {
    this.beers.update(key, newBeer);
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
