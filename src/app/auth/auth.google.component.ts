import {Component, OnInit} from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods} from "angularfire2";
import { Router } from '@angular/router';


@Component({
  selector: 'auth-google',
  template: `
    <button md-raised-button  (click)="loginGoogle()" color="warn">Login with Google</button>
  `,
  styles: [],
  providers: []
})
export class AuthGoogleComponent implements OnInit {

  constructor(private af: AngularFire, private router: Router) {
  }

  ngOnInit() {
  }

  loginGoogle() {
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup,
    }).then(
      (success) => {

      // Create User Object to Users Table
      let userObject = {
        email: success.auth.email,
        lastLogin: new Date().toDateString()
      };

      this.af.database.object('/users/' + success.uid).update(userObject);
      this.router.navigate(['/cellar']);
    }).catch(
      (err) => {
      console.log(err);
    })
  }
}
