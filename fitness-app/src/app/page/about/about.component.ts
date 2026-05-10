import { Component } from '@angular/core';
import { AboutSectionComponent } from "../home/components/about-section.component";

@Component({
  selector: 'app-about',
  imports: [AboutSectionComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {}
