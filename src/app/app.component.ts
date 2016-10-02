import {Component} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items: FirebaseListObservable<any>;
  isDarkTheme: boolean = false;

  constructor(public af: AngularFire) {
    af.auth.subscribe((user) => {
      if (user) {
        // User signed in!
        this.getItems();
      } else {
        // User logged out
        this.items = null;
      }
    });
  }

  getItems() {
    this.items = this.af.database.list('/items');
  }

  addItem(newName: string) {
    this.items.push({text: newName});
  }

  updateItem(key: string, newText: string) {
    this.items.update(key, {text: newText});
  }

  deleteItem(key: string) {
    this.items.remove(key);
  }

  deleteEverything() {
    this.items.remove();
  }

  login() {
    this.af.auth.login();
  }

  logout() {
    this.af.auth.logout();

  }
}
