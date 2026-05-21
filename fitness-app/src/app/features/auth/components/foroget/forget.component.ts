import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { CustomInputComponent } from "../../../../shared/components/customInput/customInput.component";
import { InputOtpModule } from 'primeng/inputotp';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@org/auth';
import { Router } from '@angular/router';
import { passwordMatchValidator } from '../../../../utils/password-match.validator';
import { passwordValidator } from '../../../../utils/password-validator';

@Component({
  standalone: true,
  selector: 'app-forget',
  imports: [CommonModule, IconFieldModule, InputIconModule, InputTextModule, CustomInputComponent, InputOtpModule, FormsModule,ReactiveFormsModule],
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css'],
})
export class ForgetComponent implements OnInit {

step = signal<number>(1);
private _authService = inject(AuthService);
private _router = inject(Router);
 
email = '';

forgetForm!: FormGroup;

initForm() {
    this.forgetForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^\w{6}$/)]),
      password: new FormControl(null, [Validators.required, Validators.pattern(passwordValidator.pattern)]),
      newPassword: new FormControl(null, [Validators.required, Validators.pattern(passwordValidator.pattern)])
    }, { validators: passwordMatchValidator('password', 'newPassword') });
  }



get formControls() {
    return this.forgetForm.controls as any;
  }


submitEmail() {
 const model = { email: this.forgetForm.value.email };

 this._authService.forgotPassword(model).subscribe({
  next: (res) => {
    this.step.set(2);
    console.log(res);
  },
  error: (err) => {
    console.error(err);
  } 
  });
}
submitCode(){
 const model = { resetCode: this.forgetForm.value.resetCode };
 this._authService.VerifyReset(model).subscribe({
  next: (res) => {
    this.step.set(3);
    console.log(res);
  },
  error: (err) => {
    console.error(err);
  }
 })
}



  submitPassword(){
    const model = {
      email: this.forgetForm.value.email,
      newPassword: this.forgetForm.value.password
    };
    this._authService.ResetPassword(model).subscribe({
      next: (res) => {
        console.log(res);
        this._router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  resendCode() {
const payload = { email: this.forgetForm.value.email };
this._authService.forgotPassword(payload).subscribe({
  next: (res) => {
    console.log(res);
  },
  error: (err) => {
    console.error(err);
  }
})

  }


  ngOnInit(): void {
    this.initForm();
  }


}
