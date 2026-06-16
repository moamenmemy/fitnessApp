import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { SecrionTitleComponent } from 'fitness-app/src/app/Shareds/section-title/secrion-title.component';

@Component({
  selector: 'app-why-us',
  imports: [NgOptimizedImage, SecrionTitleComponent],
  templateUrl: './whyUs.component.html',
  styleUrl: './whyUs.component.css',
})
export class WhyUsComponent {}
