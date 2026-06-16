import { Component, input } from '@angular/core';

@Component({
  selector: 'app-mainbutton',
  imports: [],
  templateUrl: './mainbutton.component.html',
  styleUrl: './mainbutton.component.css',
})
export class MainbuttonComponent {
    label = input.required<string>();
  onClick = input<() => void>();
  disabled = input<boolean>();
  loading = input<boolean>();

  handleClick() {
    const callback = this.onClick();
    callback?.();
  }
}
