import { Component } from '@angular/core';
import { ButtonUiComponent } from '../../Shared/components/button-ui/buttonUi.component';


@Component({
  standalone: true,
  selector: 'app-hero-section',
  imports: [ButtonUiComponent],
  templateUrl: './hero-section.component.html',
  styleUrls: ["./hero-section.component.css"],
})
export class HeroSectionComponent {}
