import {Component} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isDarkTheme: boolean = false;
  userName: string = "";

  constructor(public af: AngularFire) {
    af.auth.subscribe((user) => {
      if (user) {
        // User signed in!
        this.userName = user.auth.displayName;
      } else {
        // User logged out
      }
    });
  }

  login() {
    this.af.auth.login();
  }

  logout() {
    this.af.auth.logout();

  }
}
