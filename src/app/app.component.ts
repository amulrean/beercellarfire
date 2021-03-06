import {Component, OnInit} from '@angular/core';
import {AngularFire} from 'angularfire2';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  template: `
    <md-sidenav-layout>

    
      <md-toolbar color="primary">
        Beer Cellar
        
        <button md-button routerLink="/">Home</button>
    
        <span class="app-toolbar-filler"></span>
        
        <span *ngIf="af.auth | async">
          <button md-button routerLink="/cellar">My Cellar</button>
          <button md-button (click)="logout()">Logout</button>
        </span>
        <span *ngIf="!(af.auth | async)">
          <button md-button routerLink="/login">Login</button>
          <button md-button routerLink="/signup">Sign Up</button>
        </span>
      </md-toolbar>
    
      <div class="app-content">
        <router-outlet></router-outlet>
      </div>
    
    
    </md-sidenav-layout>
    
    <span class="app-action">
      <button md-fab><md-icon>add</md-icon></button>
    </span>
`,
  styleUrls: []
})
export class AppComponent implements OnInit{

  user;

  constructor(public af: AngularFire, private router: Router) {

  }

  ngOnInit() {
    // this.af.auth.subscribe(
    //   user => this.user);
  }

  logout() {
    this.af.auth.logout();
    this.router.navigate(['/'])
  }
}
