import { Component, Input } from '@angular/core';
import { IconField } from "primeng/iconfield";
import { InputIcon } from "primeng/inputicon";

@Component({
  selector: 'app-custom-input',
  imports: [IconField, InputIcon],
  templateUrl: './customInput.component.html',
  styleUrl: './customInput.component.css',
})
export class CustomInputComponent {
  @Input() label = '';
  @Input() icon = ''; 
  @Input() type = 'text'; 
  @Input() placeholder = '';
  isPasswordVisible = false;

  togglePassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
