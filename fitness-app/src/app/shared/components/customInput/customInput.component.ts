import { Component, forwardRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconField } from "primeng/iconfield";
import { InputIcon } from "primeng/inputicon";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { InputTextModule } from "primeng/inputtext";

@Component({
  standalone: true,
  selector: 'app-custom-input',
  imports: [CommonModule, FormsModule, IconFieldModule, InputIconModule, InputTextModule],
  templateUrl: './customInput.component.html',
  styleUrls: ['./customInput.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    }
  ]
})
export class CustomInputComponent implements ControlValueAccessor {
 @Input() label = '';
  @Input() icon = '';
  @Input() type = 'text';
  @Input() placeholder = '';

  value = '';
  disabled = false;
  isPasswordVisible = false;

  
  onChange: any = () => {};
  onTouched: any = () => {};

  togglePassword() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

 
  writeValue(value: any): void {
    this.value = value || '';
  }

 
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }


  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }


  onModelChange(newValue: string) {
    this.value = newValue;
    this.onChange(newValue);
  }
}
