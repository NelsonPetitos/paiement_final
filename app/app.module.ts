import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { NavigationComponent } from './components/header/navigation.component';
import { IntroComponent } from './components/intro/intro.component';
import { AboutComponent } from './components/about/about.component';
import { GetstartedComponent } from './components/getstarted/getstarted.component';
import { DocsComponent } from './components/docs/docs.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, NavigationComponent, IntroComponent, AboutComponent, GetstartedComponent, DocsComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
