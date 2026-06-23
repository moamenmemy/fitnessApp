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
        path: 'UserProfile',
        loadComponent: () =>
          import('./features/userprofile/userprofile.component').then((m) => m.UserprofileComponent),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./page/about/about.component').then((m) => m.AboutComponent),
      },
      {
        path: 'classes',
        loadComponent: () =>
          import('./page/classes/classes.component').then((m) => m.ClassesComponent),
      },
      {
        path: 'healthy',
        loadComponent: () =>
          import('./page/healthy/healthy.component').then((m) => m.HealthyComponent),
      },
    ],
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./features/auth/auth-layouts.component').then(
        (m) => m.AuthLayoutsComponent,
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
          import('./features/auth/components/login/login.component').then(
            (m) => m.LoginComponent,
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/components/register/register.component').then(
            (m) => m.RegisterComponent,
          ),
      },
      {
        path: 'forgotPass',
        loadComponent: () =>
          import('./features/auth/components/foroget/forget.component').then(
            (m) => m.ForgetComponent,
          ),
      },
    ],
  },
];
