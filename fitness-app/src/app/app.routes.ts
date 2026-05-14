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

  {
    path:'',
    loadComponent:()=>import('./features/auth/auth-layouts.component').then(m => m.AuthLayoutsComponent),
    children:[
      {path:'forgotPass',
      loadComponent:()=>import('./features/auth/components/foroget/forget.component').then(m => m.ForgetComponent)
      }
    ]
  }
];
