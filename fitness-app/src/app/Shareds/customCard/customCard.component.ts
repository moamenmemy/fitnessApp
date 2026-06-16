import { Component, input } from '@angular/core';
import { faSagittarius } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-custom-card',
  imports: [FaIconComponent],
 templateUrl: './customCard.component.html',
  styleUrl: './customCard.component.css',
})
export class CustomCardComponent {
  sagittarius = faSagittarius;

  imageSrc = input<string>('assets/logo.png'); 
  title = input.required<string>();         
  subText = input<string>('Explore');
}
