import 'zone.js';

import { initFederation } from '@angular-architects/native-federation';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

(async () => {
  await initFederation({
    mfe1: 'http://localhost:4201/remoteEntry.json',
  });
  await bootstrapApplication(AppComponent, appConfig).catch((err) =>
    console.error(err)
  );
})();
