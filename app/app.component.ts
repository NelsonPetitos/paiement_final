import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
        <my-navigation></my-navigation>
        <intro-section></intro-section>
        <about-section></about-section>
        <getstarted-section></getstarted-section>
        <docs-section></docs-section>        
    `,
})
export class AppComponent  { }
