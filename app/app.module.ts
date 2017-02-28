import { NgModule }      from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AUTH_PROVIDERS } from 'angular2-jwt';

import { AppComponent }  from './app.component';

const defaultRoutes: Routes = [];

@NgModule({
  imports: [  BrowserModule],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ AUTH_PROVIDERS ]
})
export class AppModule { }
