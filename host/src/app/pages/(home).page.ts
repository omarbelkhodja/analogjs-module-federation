import { Component } from '@angular/core';

import { AnalogWelcomeComponent } from './analog-welcome.component';

@Component({
  selector: 'host-home',
  standalone: true,
  imports: [AnalogWelcomeComponent],
  template: ` <host-analog-welcome /> `,
})
export default class HomeComponent {}
