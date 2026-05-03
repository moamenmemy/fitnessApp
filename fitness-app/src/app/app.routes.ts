import { Route } from '@angular/router';
import { MainLayoutsComponent } from './layouts/main/main-layouts.component';
import { HomeComponent } from './page/home.component';
import { AuthLayoutsComponent } from './layouts/auth/auth-layouts.component';
import { RegisterComponent } from './page/register/register.component';
import { LoginComponent } from './page/login/login.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: MainLayoutsComponent,
    children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component:HomeComponent}
    ],
  },
  {path:'auth',component:AuthLayoutsComponent,children:[
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent}
  ]}
];
