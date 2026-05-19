import { Component, input } from '@angular/core';

@Component({
  selector: 'app-main-button',
  imports: [],
  templateUrl: './mainButton.component.html',
  styleUrl: './mainButton.component.css',
})
export class MainButtonComponent {
  label = input.required<string>(); // نص الزر
 
}
