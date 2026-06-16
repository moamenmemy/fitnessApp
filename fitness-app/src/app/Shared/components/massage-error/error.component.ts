import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
})
export class ErrorComponent {
    @Input() control: AbstractControl | null = null;
  @Input() label = '';
  

  get errorMessage(): string | null {
    if (
      !this.control ||
      !this.control.touched ||
      !this.control.errors
    ) {
      return null;
    }

    if (this.control.hasError('required')) {
      return `${this.label} is required.`;
    }

    if (this.control.hasError('email')) {
      return 'Please enter a valid email address.';
    }

    if (this.control.hasError('minlength')) {
      const requiredLength =
        this.control.getError('minlength').requiredLength;

      return `${this.label} must be at least ${requiredLength} characters.`;
    }

   
    if (this.control.hasError('pattern')) {
      return 'Must contain at least 8 chars, 1 uppercase, 1 lowercase, 1 number, and 1 special character.';
    }
    if (this.control.hasError('passwordMismatch')) {
      return 'Passwords do not match.';
    }

    return null;
  }
}
