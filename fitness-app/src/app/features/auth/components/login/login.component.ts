import { Component, inject, OnInit } from '@angular/core';

import { Router, RouterLink } from "@angular/router";

import { MainButtonComponent } from '../../../../Shared/components/main-button/mainButton.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomInputComponent } from '../../../../Shared/components/customInput/customInput.component';
import { AuthService } from '@org/auth';
import { passwordValidator } from '../../../../utils/password-validator';


@Component({
  selector: 'app-login',
  imports: [CommonModule, 
    FormsModule, 
    ReactiveFormsModule, 
    CustomInputComponent, 
    MainButtonComponent,
    RouterLink],
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
        Validators.pattern(passwordValidator.pattern) 
      ])
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
       
        this._router.navigate(['/home']); 
      },
      error: (err) => {
        this.isSubmitting = false;
        console.error('Login Error:', err);
      }
    });
  }


  ngOnInit(): void {
    this.initForm();
  }
}
