import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComingSoonComponent } from './pages/coming-soon/coming-soon.component';
import { BecomeAdonorComponent } from './pages/become-adonor/become-adonor.component';
export const routes: Routes = [
    {
      path: '',
      redirectTo: '/coming-soon',
      pathMatch: 'full'
    },
    { path: 'coming-soon', component: ComingSoonComponent },
    { path: 'become-a-donor', component: BecomeAdonorComponent }
  ];
  export const routing: ModuleWithProviders = RouterModule.forRoot(routes);

