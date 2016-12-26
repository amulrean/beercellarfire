import {Component, OnInit, EventEmitter} from '@angular/core';
import {AngularFire} from 'angularfire2';
import {Output} from "@angular/core/src/metadata/directives";
import {AppUser} from "./users";


@Component({
  selector: 'user-edit',
  template: `
<form (ngSubmit)="onSubmit()" #userForm="ngForm">
  <md-card class="md-card">
    <md-card-title>Create New Beer Cellar User:</md-card-title>
    <md-card-content>
      <div class="form-group">
        <label for="username">User Name</label>
        <input type="text" class="form-control" id="username"
               required
               [(ngModel)]="appUser.username" name="username"
               #username="ngModel">
        <div [hidden]="username.valid || username.pristine"
             class="alert alert-danger">
          User Name is required
        </div>
      </div>
      <div class="form-group">
        <label for="firstName">First Name</label>
        <input type="text" class="form-control" id="firstName"
               required
               [(ngModel)]="appUser.firstName" name="firstName"
               #firstName="ngModel">
        <div [hidden]="firstName.valid || firstName.pristine"
             class="alert alert-danger">
          First Name is required
        </div>
      </div>
      <div class="form-group">
        <label for="lastName">Last Name</label>
        <input type="text" class="form-control" id="lastName"
               required
               [(ngModel)]="appUser.lastName" name="lastName"
               #lastName="ngModel">
        <div [hidden]="lastName.valid || lastName.pristine"
             class="alert alert-danger">
          Last Name is required
        </div>
      </div>
      <div class="form-group">
        <label for="cellarDescription">Cellar Description</label>
        <input type="text" class="form-control" id="cellarDescription"
               required
               [(ngModel)]="appUser.cellarDescription" name="cellarDescription"
               #cellarDescription="ngModel">
      </div>
    </md-card-content>
    <md-card-actions>
      <button md-button (click)="logout()">Logout</button>
      <button md-button (click)="submit()" [disabled]="!userForm.form.valid">Create User</button>
    </md-card-actions>
  </md-card>
</form>
  `,
  styles: [`
  `],
  providers: []
})
export class UserEditComponent implements OnInit {

  @Output() onAddItem = new EventEmitter<AppUser>();

  private appUser: AppUser = null;

  constructor(public af: AngularFire) {
  }

  ngOnInit() {
  }

  logout() {
    this.af.auth.logout();
  }

  submit() {
    this.onAddItem.emit(this.appUser);
  }

}
