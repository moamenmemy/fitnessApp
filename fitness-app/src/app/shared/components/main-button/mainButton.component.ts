import { Component, EventEmitter, input, Output } from '@angular/core';

@Component({
  selector: 'app-main-button',
  imports: [],
  templateUrl: './mainButton.component.html',
  styleUrl: './mainButton.component.css',
})
export class MainButtonComponent {
  label = input.required<string>(); // نص الزر
disabled = input<boolean>(false);
 @Output() btnClick = new EventEmitter<void>();

}
