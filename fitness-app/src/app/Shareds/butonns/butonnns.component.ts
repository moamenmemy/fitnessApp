import { Component, EventEmitter, input, Output } from '@angular/core';
@Component({
  selector: 'app-butonnns',
  imports: [],
  templateUrl: './butonnns.component.html',
  styleUrl: './butonnns.component.css',
})
export class ButonnnsComponent {
  label = input.required<string>(); // نص الزر
disabled = input<boolean>(false);
 @Output() btnClick = new EventEmitter<void>();
}
