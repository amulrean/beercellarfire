import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {MaterialModule} from '@angular/material';
import './rxjs-extensions';

import { AppComponent } from './app.component';
import { secrets } from '../environments/environment-secrets';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { BeerListComponent } from './beer-list/beer-list.component';
import { BeerNewComponent } from './beer-list/beer-new.component';

// Must export the config
export const firebaseConfig = secrets.firebaseConfig;

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};

@NgModule({
  declarations: [
    AppComponent,
    BeerListComponent,
    BeerNewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
