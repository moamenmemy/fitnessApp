import { Route } from '@angular/router';
import { MainLayoutsComponent } from './layouts/main/main-layouts.component';
import { HomeComponent } from './page/home.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: MainLayoutsComponent,
    children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component:HomeComponent}
    ],
  },
];
