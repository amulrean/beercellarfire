import {Component} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: `
    <md-sidenav-layout [class.m2app-dark]="isDarkTheme">

      <md-sidenav #sidenav mode="side" class="app-sidenav">
        Sidenav
      </md-sidenav>
    
      <md-toolbar color="primary">
        <button class="app-icon-button" (click)="sidenav.toggle()">
          <i class="material-icons app-toolbar-menu">menu</i>
        </button>
    
        Beer Cellar
    
        <span class="app-toolbar-filler"></span>
        <button md-button (click)="isDarkTheme = !isDarkTheme">TOGGLE DARK THEME</button>
        <button md-button (click)="login()" *ngIf="!(af.auth | async)">Login</button>
        <button md-button (click)="logout()" *ngIf="af.auth | async">Logout {{ userName}}</button>
      </md-toolbar>
    
      <div class="app-content">
    
        <div *ngIf="af.auth | async">
          <app-beer-list></app-beer-list>
        </div>
      </div>
    
    
    </md-sidenav-layout>
    
    <span class="app-action" [class.m2app-dark]="isDarkTheme">
      <button md-fab><md-icon>add</md-icon></button>
    </span>
`,
  styleUrls: [`

`]
})
export class AppComponent {

  isDarkTheme: boolean = false;
  userName: string = "";

  constructor(public af: AngularFire) {
    af.auth.subscribe((user) => {
      if (user) {
        // User signed in!
        //noinspection TypeScriptUnresolvedVariable
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
