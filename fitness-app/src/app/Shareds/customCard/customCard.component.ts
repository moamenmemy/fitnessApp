import { Component, input, output } from '@angular/core';
import { faSagittarius } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-custom-card',
  standalone: true,
  imports: [],
  templateUrl: './customCard.component.html',
  styleUrl: './customCard.component.css',
})
export class CustomCardComponent {
  sagittarius = faSagittarius;

imageSrc = input.required<string>(); 
  title = input.required<string>(); 
  subText = input<string>('Explore');
  cardClicked = output<void>();

onCardClick() {
  console.log('1. Card Clicked'); // إضافة هذا السطر للتأكد
  this.cardClicked.emit();
}
}
