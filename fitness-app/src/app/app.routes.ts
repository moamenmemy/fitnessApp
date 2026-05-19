import { Route } from '@angular/router';


export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/main/main-layouts.component').then(
        (m) => m.MainLayoutsComponent,
      ),
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./page/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./page/about/about.component').then((m) => m.AboutComponent),
      },
    ],
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./features/auth/auth-layouts.component').then(
        (m) => m.AuthLayoutsComponent
      ),
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./layouts/auth/components/login/login.component').then(
            (m) => m.LoginComponent,
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./layouts/auth/components/register/register.component').then(
            (m) => m.RegisterComponent,
          ),
      },
         {path:'forgotPass',
      loadComponent:()=>import('./features/auth/components/foroget/forget.component').then(m => m.ForgetComponent)
      },
    ],
  },
];
