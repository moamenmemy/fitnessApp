
import { Component, inject, OnInit } from '@angular/core';

import { Router, RouterLink } from '@angular/router';

import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AuthService } from '@org/auth';
import { passwordValidator } from '../../../../utils/password-validator';
import { CustomInputComponent } from 'fitness-app/src/app/Shareds/custominput/customInput.component';
import { ErrorComponent } from 'fitness-app/src/app/Shareds/massage-error/error.component';
import { ButonnnsComponent } from 'fitness-app/src/app/Shareds/butonns/butonnns.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ButonnnsComponent,
    FormsModule,
    ReactiveFormsModule,
    CustomInputComponent,
    ErrorComponent,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private _authService = inject(AuthService);
  private _router = inject(Router);

  loginForm!: FormGroup;
  isSubmitting = false;

  initForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(passwordValidator.pattern),
      ]),
    });
  }

  submitLogin() {
    if (this.loginForm.invalid) return;

    this.isSubmitting = true;
    const model = this.loginForm.value;

    this._authService.Login(model).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        console.log('Login Success:', res);
        // Navigate to home on successful login
        this._router.navigate(['/home']);
      },
      error: (err) => {
        this.isSubmitting = false;
        console.error('Login Error:', err);
      },
    });
  }

  authProviders = [
    { name: 'facebook', icon: 'pi pi-facebook' },
    { name: 'google', icon: 'pi pi-google' },
    { name: 'apple', icon: 'pi pi-apple' },
  ];

  ngOnInit(): void {
    this.initForm();
  }
}
