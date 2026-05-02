import { Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-secrion-title',
  imports: [FontAwesomeModule],
  templateUrl: './secrion-title.component.html',
  styleUrl: './secrion-title.component.css',
})
export class SecrionTitleComponent {
  title = input.required<string>(); 
  fadumbbell=faDumbbell
  bgTitle = input<string>()
}
