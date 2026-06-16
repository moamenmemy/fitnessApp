import { CommonModule } from '@angular/common';
import { Component, inject, signal,DestroyRef } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,

  Validators,

} from '@angular/forms';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';



import { RadioButtonModule } from 'primeng/radiobutton';
import { passwordValidator } from 'fitness-app/src/app/utils/password-validator';
import { AuthService } from '@org/auth';
import { Router, RouterLink } from '@angular/router';

import { passwordMatchValidator } from 'fitness-app/src/app/utils/password-match.validator';
import { CustomInputComponent } from 'fitness-app/src/app/Shareds/custominput/customInput.component';
import { MainbuttonComponent } from 'fitness-app/src/app/Shareds/main-button/mainbutton.component';
import { ErrorComponent } from 'fitness-app/src/app/Shareds/massage-error/error.component';
import { ScrollComponent } from 'fitness-app/src/app/Shareds/number-scuroll/scroll.component';
import { TextComponent } from 'fitness-app/src/app/Shareds/register-text/text.component';
import { RadioComponent } from 'fitness-app/src/app/Shareds/reusableRadio/radio.component';
@Component({
  selector: 'app-register',
  imports: [
   CustomInputComponent,
   MainbuttonComponent,
    ScrollComponent,
    RadioButtonModule,
    FormsModule,
RouterLink,
    ReactiveFormsModule,
    CommonModule,
    RadioComponent,
    ErrorComponent,
    TextComponent
],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  destroyRef = inject(DestroyRef);
  step = signal<number>(1);
  totalSteps = 6;
  isSubmitting = signal(false);
  _auth = inject(AuthService);
  _router = inject(Router);
  _fb = inject(FormBuilder);

  registerForm: FormGroup = this._fb.group(
    {
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.pattern(passwordValidator.pattern)],
      ],
      rePassword: ['', [Validators.required]],
      height: ['', [Validators.required]],
      goal: ['', [Validators.required]],
      age: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      activityLevel: ['', [Validators.required]],
    },
    {
  validators: passwordMatchValidator(
    'password',
    'rePassword'
  )
},
  );
 
 submit = () => {
  if (!this.registerForm.valid || this.isSubmitting()) {
    this.registerForm.markAllAsTouched();
    return;
  }

  this.isSubmitting.set(true);

  this._auth
    .SignUp(this.registerForm.value)
    .pipe(
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this._router.navigate(['/auth/login']);
        }
      },

      error: (err) => {
        console.log(err);
        this.isSubmitting.set(false);
      },

      complete: () => {
        this.isSubmitting.set(false);
      },
    });
};
get knobValue(): number {
  return Math.max(this.step() - 1, 0);
}
  getGradientBg(): string {
    const chartStep = this.step() - 1;
    const percentage = (chartStep / this.totalSteps) * 100;
    return `conic-gradient(from 220deg, #FF4500 0% ${percentage}%, #2B2B2B ${percentage}% 100%)`;
  }

  advanceStep = () => {
    if (this.step() < 7) {
      this.step.update((value) => value + 1);
    }
  };

  isStepButtonDisabled(): boolean {
    const currentStep = this.step();

    if (currentStep === 1) {
      const { firstName, lastName, email, password, rePassword } =
        this.registerForm.value;
      return (
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !rePassword ||
        password !== rePassword
      );
    }

    if (currentStep === 2) {
      return !this.registerForm.get('gender')?.value;
    }

    if (currentStep === 6) {
      return !this.registerForm.get('goal')?.value;
    }

    if (currentStep === 7) {
      return !this.registerForm.get('activityLevel')?.value;
    }

    // خطوات 3, 4, 5 لا تحتاج validation (لها قيم افتراضية)
    return false;
  }

  goals = signal([
    { id: 'gain', text: 'Gain Weight' },
    { id: 'lose', text: 'Lose Weight' },
    { id: 'fit', text: 'Get Fitter' },
    { id: 'flexible', text: 'Gain More Flexible' },
    { id: 'basic', text: 'Learn The Basic' },
  ]);
  activityLevel = signal([
    { id: 'level1', text: 'level1' },
    { id: 'level2', text: 'level2' },
    { id: 'level3', text: 'level3' },
    { id: 'level4', text: 'level4' },
    { id: 'level5', text: 'level5' },
  ]);
}
