import { Component, input, output } from '@angular/core';
import { faSagittarius } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-custom-card',
  imports: [],
 templateUrl: './customCard.component.html',
  styleUrl: './customCard.component.css',
})
export class CustomCardComponent {
  sagittarius = faSagittarius;

  imageSrc = input<string>('assets/logo.png'); 
  title = input.required<string>();         
  subText = input<string>('Explore');
  cardClicked = output<void>();

  onCardClick(event: MouseEvent) {
    event.stopPropagation(); 
    this.cardClicked.emit();
  }
}
