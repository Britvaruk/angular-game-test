import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/game-page/game-page.component').then((m) => m.GamePageComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
