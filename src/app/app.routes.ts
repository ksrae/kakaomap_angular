import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', children: [
    // {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'project', loadChildren: () => import('./project/project.routes').then(m => m.projectRoutes) }
  ]}
];
