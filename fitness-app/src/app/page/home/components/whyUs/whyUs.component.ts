import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { SecrionTitleComponent } from "../../../../shared/components/secrion-title.component";

@Component({
  selector: 'app-why-us',
  imports: [NgOptimizedImage, SecrionTitleComponent],
  templateUrl: './whyUs.component.html',
  styleUrl: './whyUs.component.css',
})
export class WhyUsComponent {}
