import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-radio',
  imports: [CommonModule],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.css',
})
export class RadioComponent {
    @Input() label = '';
  @Input() value: any = null;
  @Input() name = 'radioGroup';
  @Input() checked = false;
  @Output() checkedChange = new EventEmitter<any>();

  selectOption() {
    this.checkedChange.emit(this.value);
  }
}
