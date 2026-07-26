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
  cardClicked = output<string>();
fallbackImage = 'assets/workout.jpg';
id = input.required<string>();



onCardClick(event: MouseEvent) {
  event.stopPropagation();
  this.cardClicked.emit(this.id());
}
  getImage(img: string | null | undefined): string {
  return img?.trim() ? img : this.fallbackImage;
}
}
