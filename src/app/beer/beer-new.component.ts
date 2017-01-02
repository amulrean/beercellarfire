import {Component, OnInit, EventEmitter} from '@angular/core';

import { BreweryService } from './brewery.service';
import {Beer, CellarRecord} from './beer';
import {Output} from "@angular/core/src/metadata/directives";


@Component({
  selector: 'app-beer-new',
  template: `
    <md-card class="md-card new-beer-card">
      <div class="new-beer-search">
        <h4>New Beer:</h4>
        <md-input placeholder="Beer Name" [(ngModel)]="newRecord.beer.name" ></md-input>
        <md-input placeholder="Brewery Name" [(ngModel)]="newRecord.beer.breweries[0].name" ></md-input>
        <md-input placeholder="Count" [(ngModel)]="newRecord.count" ></md-input>
        <md-input placeholder="Year" [(ngModel)]="newRecord.year" ></md-input>
        <button md-raised-button color="accent" (click)="addItem()" md-tooltip="Add Selected Beer to your Cellar">Add Beer</button>
      </div>
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

  @Output() onAddItem = new EventEmitter<CellarRecord>();

  newRecord: CellarRecord;

  constructor() {
    this.newRecord = new CellarRecord();
    this.newRecord.year = new Date().getFullYear();
  }

  ngOnInit() {

  }

  addItem() {
    if (this.newRecord.beer.name != null) {
      this.onAddItem.emit(this.newRecord);
      this.newRecord = new CellarRecord();
    }
  }

}
