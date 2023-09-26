import { RouteMeta } from '@analogjs/router';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { loadRemoteModule } from '@softarc/native-federation-runtime';

@Component({
  selector: 'host-mfe1',
  standalone: true,
  template: ` <div #placeHolder></div> <button (click)="load()">Load!</button>`,
})
export default class Mfe1Component {
  @ViewChild('placeHolder', { read: ViewContainerRef })
  viewContainer!: ViewContainerRef;

  async load(): Promise<void> {
    const module = await loadRemoteModule({
      remoteName: 'mfe1',
      exposedModule: './cmp',
    });    
    this.viewContainer.createComponent(module.AppComponent);
  }
}
