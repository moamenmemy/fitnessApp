import { Route } from '@angular/router';
import { MainLayoutsComponent } from './layouts/main/main-layouts.component';
import { HomeComponent } from './page/home.component';
import { AuthLayoutsComponent } from './layouts/auth/auth-layouts.component';
import { ForgetComponent } from './layouts/auth/components/foroget/forget.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: MainLayoutsComponent,
    children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component:HomeComponent}
    ],
  },

  {
    path:'',
    component:AuthLayoutsComponent,
    children:[
      {path:'forgotPass',component:ForgetComponent}
    ]
  }
];
