import { Component, OnInit } from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

export class Beer {
  name: string;
  brewery: string;
  style: string;
  abv: number;
}

@Component({
  selector: 'app-beer-list',
  templateUrl: './beer-list.component.html',
  styleUrls: ['./beer-list.component.css']
})
export class BeerListComponent implements OnInit {

  beers: FirebaseListObservable<any>;
  newBeer: Beer;

  constructor(public af: AngularFire) {
    this.newBeer = new Beer();
  }

  ngOnInit() {
    this.beers = this.af.database.list('/beers');
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

}
