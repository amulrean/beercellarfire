import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {MaterialModule} from '@angular/material';
import './rxjs-extensions';

import { AppComponent } from './app.component';
import { secrets } from '../environments/environment-secrets';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { BeerListComponent } from './beer/beer-list.component';
import { BeerNewComponent } from './beer/beer-new.component';
import {BeercellarfireRoutingModule} from "./app-routing.module";
import { AuthModule } from './auth/auth.module';
import {HomeComponent} from "./home.compoent";
import {AuthGuard} from "./auth/auth-gaurd.service";

// Must export the config
export const firebaseConfig = secrets.firebaseConfig;

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BeerListComponent,
    BeerNewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    BeercellarfireRoutingModule,
    AuthModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
