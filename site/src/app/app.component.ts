import { Component } from '@angular/core';

import { AuthWRT } from './services/my-auth.service';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent  {

  constructor(private auth: AuthWRT){}
  
}
