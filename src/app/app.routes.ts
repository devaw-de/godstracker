import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./feature/tracker/tracker.component').then(c => c.TrackerComponent)
  },
  {
    path: 'debug',
    loadComponent: () => import('./feature/debug/debug.component').then(c => c.DebugComponent)
  },
  {
    path: '**',
    redirectTo: '',
  }
];
