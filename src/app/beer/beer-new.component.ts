import {Component, OnInit, EventEmitter} from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import { BreweryService } from './brewery.service';
import { Beer } from './beer';
import {Output} from "@angular/core/src/metadata/directives";


@Component({
  selector: 'app-beer-new',
  template: `
    <md-card class="md-card new-beer-card">
      <div class="new-beer-search">
        <h4>New Beer:</h4>
        <md-input placeholder="Beer Search" #searchBox id="search-box" (keyup)="search(searchBox.value)" ></md-input>
        <button md-raised-button color="accent" (click)="addItem()" md-tooltip="Add Selected Beer to your Cellar">Add Beer</button>
      </div>
      <md-progress-bar mode="indeterminate" color="accent" *ngIf="searchInFlight"></md-progress-bar>
      <md-list class="beer-list">
        <md-list-item *ngFor="let beer of beerSearchResults | async"
                      (click)="selectItem(beer)" 
                      [class.selected]="beer === selectedBeer">
          <img md-list-avatar 
            *ngIf="beer.breweries && beer.breweries[0] && beer.breweries[0].images"
            src="{{ beer.breweries[0].images.icon }}" alt="...">
          <h3 md-line> {{beer.name}} </h3>
          <p md-line>
            <span class="brewery-text" *ngIf="beer.breweries && beer.breweries[0]"> -- {{ beer.breweries[0].name }} </span>
            <span *ngIf="beer.style"> {{ beer.style.name}} </span>
          </p>
        </md-list-item>
      </md-list>
    </md-card>
`,
  styles: [`
    .selected {
      background-color: #dc9936 !important;
      color: white;
    }
    .brewery-text {
      
    }
    .new-beer-card {
      display: flex;
      flex-flow: column wrap;
      justify-content: space-around;
      height: 200px;
    }
    .new-beer-search {
      flex-direction: row;
    }
    .beer-list {
      max-height: 200px;
      overflow: auto;
    }
  `],
  providers: [BreweryService]
})

export class BeerNewComponent implements OnInit {

  @Output() onAddItem = new EventEmitter<Beer>();

  selectedBeer: Beer;
  beerSearchResults: Observable<Beer[]>;
  private searchTerms = new Subject<string>();

  searchInFlight: boolean = false;

  constructor(
    private breweryService: BreweryService
  ) {
    this.selectedBeer = null;
  }

  ngOnInit() {

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
    if (this.selectedBeer != null) {
      this.onAddItem.emit(this.selectedBeer);
      this.selectedBeer = null;
    }
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  selectItem(beer: Beer): void {
    this.selectedBeer = beer;
  }

}
