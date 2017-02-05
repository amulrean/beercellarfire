import { NgModule }      from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { authRouting } from './auth.routing';
import { LoginComponent, SignupComponent, ResetpassComponent } from './auth.component';
import {AuthGoogleComponent} from "./auth.google.component";
import {MaterialModule} from "@angular/material";
import {FlexLayoutModule} from "@angular/flex-layout";
import {EqualValidator} from "../utils/equal-validator.directive";

@NgModule({
  imports:      [
    authRouting,
    FormsModule,
    CommonModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
   ],
  declarations: [
    SignupComponent,
    LoginComponent,
    ResetpassComponent,
    AuthGoogleComponent,
    EqualValidator
  ]
})
export class AuthModule { }
