import { Component } from '@angular/core';

@Component({
  selector: 'app-services-bar',
  imports: [],
  templateUrl: './servicesBar.component.html',
  styleUrl: './servicesBar.component.css',
})
export class ServicesBarComponent {
  marqueeItems: string[] = [
    'live classes',
    'outdoor & online trainers',
    'personal training',
    'Live Classes',
    'Personal Trainers'
  ];
}
