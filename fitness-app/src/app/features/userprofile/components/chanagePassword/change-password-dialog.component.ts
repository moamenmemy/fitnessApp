import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '@org/auth';
import { ButonnnsComponent } from 'fitness-app/src/app/Shareds/butonns/butonnns.component';
import { CustomInputComponent } from 'fitness-app/src/app/Shareds/custominput/customInput.component';
import { ErrorComponent } from 'fitness-app/src/app/Shareds/massage-error/error.component';
import { passwordMatchValidator } from 'fitness-app/src/app/utils/password-match.validator';
import { passwordValidator } from 'fitness-app/src/app/utils/password-validator';

@Component({
  selector: 'app-change-password-dialog',
  imports: [
    CustomInputComponent,
    ButonnnsComponent,
    ErrorComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './change-password-dialog.component.html',
  styleUrl: './change-password-dialog.component.css',
})
export class ChangePasswordDialogComponent {
  _auth = inject(AuthService);
  _fb = inject(FormBuilder);
  visible = signal(false);
  chanageForm: FormGroup = this._fb.group(
    {
      password: [
        '',
        [Validators.required, Validators.pattern(passwordValidator.pattern)],
      ],
      newPassword: [
        '',
        [Validators.required, Validators.pattern(passwordValidator.pattern)],
      ],
      rePassword: ['', [Validators.required]],
    },
    {
      validators: passwordMatchValidator('newPassword', 'rePassword'),
    },
  );

  submit() {
    const payload = {
      password: this.chanageForm.value.password,
      newPassword: this.chanageForm.value.newPassword,
    };
    if (this.chanageForm.invalid) return;

    this._auth.changePassword(payload).subscribe({
      next: (res) => {
        this.visible.set(false); // يقفل dialog
        this.chanageForm.reset();
        localStorage.removeItem('token');
        localStorage.setItem('token', res.token);
      },
    });
  }
}
