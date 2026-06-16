import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@org/auth';
import { passwordValidator } from '../../../../utils/password-validator';
import { passwordMatchValidator } from '../../../../utils/password-match.validator';

import { CustomInputComponent } from 'fitness-app/src/app/Shareds/custominput/customInput.component';
import { ButonnnsComponent } from "fitness-app/src/app/Shareds/butonns/butonnns.component";
import { ErrorComponent } from 'fitness-app/src/app/Shareds/massage-error/error.component';

@Component({
  standalone: true,
  selector: 'app-forget',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomInputComponent,
    ButonnnsComponent,
    ErrorComponent
  ],
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css'],
})
export class ForgetComponent implements OnInit {

  step = signal<number>(1);

  private _authService = inject(AuthService);
  private _router = inject(Router);

  email = ''; // 🔥 مهم جدًا

  forgetForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.forgetForm = new FormGroup(
      {
        email: new FormControl(null, [Validators.required, Validators.email]),
        resetCode: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^\w{4}$/)
        ]),
        password: new FormControl(null, [
          Validators.required,
          Validators.pattern(passwordValidator.pattern)
        ]),
        newPassword: new FormControl(null, [
          Validators.required,
          Validators.pattern(passwordValidator.pattern)
        ]),
      },
      {
        validators: passwordMatchValidator('password', 'newPassword')
      }
    );
  }

  // ✅ STEP 1
  submitEmail() {
    const email = this.forgetForm.get('email')?.value;

    if (!email) return;

    this.email = email; // 🔥 حفظ الإيميل

    this._authService.forgotPassword({ email }).subscribe({
      next: (res) => {
        console.log(res);
        this.step.set(2);
      },
      error: (err) => console.error(err),
    });
  }

  // ✅ STEP 2
  submitCode() {
    const resetCode = this.forgetForm.get('resetCode')?.value;

    this._authService.VerifyReset({ resetCode }).subscribe({
      next: (res) => {
        console.log(res);
        this.step.set(3);
      },
      error: (err) => console.error(err),
    });
  }

  // ✅ STEP 3
  submitPassword() {
    const model = {
      email: this.email,
      newPassword: this.forgetForm.get('newPassword')?.value,
    };

    this._authService.ResetPassword(model).subscribe({
      next: (res) => {
        console.log(res);
        this._router.navigate(['/auth/login']);
      },
      error: (err) => console.error(err),
    });
  }

  // 🔁 resend OTP
  resendCode() {
    this._authService.forgotPassword({ email: this.email }).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.error(err),
    });
  }
}