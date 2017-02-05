import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import {AngularFire, FirebaseApp, AuthProviders, AuthMethods} from 'angularfire2';

@Component({
  templateUrl: 'signup.component.html'
})

export class SignupComponent {
  public error: any;

  constructor(private af: AngularFire, private router: Router) {  }

  onSubmit(formData) {
    if(formData.valid) {
      this.af.auth.createUser({
        email: formData.value.email,
        password: formData.value.password
      }).then(
        (success) => {
        // Create User Object to Users Table
        let userObject = {
          email: success.auth.email,
          created: new Date().toDateString(),
          lastLogin: new Date().toDateString()
        };

        this.af.database.object('/users/' + success.uid).update(userObject);
        this.router.navigate(['/cellar']);
      }).catch(
        (err) => {
        console.log(err);
        this.error = err.message;
      })
    } else {
      this.error = 'Your form is invalid';
    }
  }
}

@Component({
  templateUrl: 'login.component.html'
})

export class LoginComponent {
  public error: any;

  constructor(public af: AngularFire, private router: Router) { }

  onSubmit(formData) {
    if(formData.valid) {
      this.af.auth.login({
        email: formData.value.email,
        password: formData.value.password
      }).then(
        (success) => {
        let userObject = {
          email: success.auth.email,
          lastLogin: new Date().toDateString()
        };

        this.af.database.object('/users/' + success.uid).update(userObject);
        this.router.navigate(['/cellar']);
      }).catch(
        (err) => {
        console.log(err);
        this.error = err.message;
      })
    } else {
      this.error = 'Your form is invalid';
    }
  }
}

@Component({
  templateUrl: 'resetpassword.component.html'
})

export class ResetpassComponent {
  public auth: any;
  public message: any;
  constructor(private af: AngularFire, @Inject(FirebaseApp) firebaseApp: any) {
    this.auth = firebaseApp.auth();
    console.log(this.auth);
  }

  onSubmit(formData) {
     if(formData.valid) {
       console.log('Submission worked');
       this.auth.sendPasswordResetEmail(formData.value.email)
         .then( (response) => {
           console.log('Sent successfully');
           this.message = 'Check your email for reset link';
         })
         .catch( (error) => {
           this.message = error;
           console.log(error);
         })
     }
  }
}
