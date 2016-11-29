import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Hello {{name}}</h1>
    <p>Mon mail est {{address}}.</p>`,
})
export class AppComponent  {
  name = 'Nelson';
  address = 'nde_nelson@yahoo.fr';
}
