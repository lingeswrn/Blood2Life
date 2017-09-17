import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComingSoonComponent } from './pages/coming-soon/coming-soon.component';
import { BecomeAdonorComponent } from './pages/become-adonor/become-adonor.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
export const routes: Routes = [
    {
      path: '',
      redirectTo: '/become-a-donor',
      pathMatch: 'full'
    },
    { path: 'coming-soon', component: ComingSoonComponent },
    { path: 'become-a-donor', component: BecomeAdonorComponent },
    { path: 'thank-you', component: ThankYouComponent }
  ];
  export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

