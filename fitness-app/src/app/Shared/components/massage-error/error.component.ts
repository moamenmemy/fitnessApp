import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css',
})
export class ErrorComponent {
   @Input() control!: AbstractControl | null;

  @Input() messages: Record<string, string> = {};

  private defaultMessages: Record<string, string> = {
    required: 'This field is required',
    minlength: 'Too short',
    maxlength: 'Too long',
    email: 'Invalid email',
    pattern: 'Invalid format'
  };
get errorMessage(): string | null {
    if (!this.control || !this.control.touched || !this.control.errors) {
      return null;
    }

    const firstErrorKey = Object.keys(this.control.errors)[0];

    return (
      this.messages[firstErrorKey] ||
      this.defaultMessages[firstErrorKey] ||
      'Invalid field'
    );
  }
}
