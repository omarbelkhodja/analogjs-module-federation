import { Component } from '@angular/core';

import { AnalogWelcomeComponent } from './analog-welcome.component';

@Component({
  selector: 'module-federation-example-home',
  standalone: true,
  imports: [AnalogWelcomeComponent],
  template: ` <module-federation-example-analog-welcome /> `,
})
export default class HomeComponent {}
