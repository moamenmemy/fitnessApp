import { Component, input, output } from '@angular/core';
import { CarouselItem, CarouselResponsiveOption } from './interface/customCarusel';
import { CarouselModule } from 'primeng/carousel'; 

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-carusel',
  imports: [CommonModule, CarouselModule,],
  templateUrl: './customCarusel.component.html',
  styleUrl: './customCarusel.component.css',
})
export class CustomCaruselComponent {
  carouselItems = input.required<CarouselItem[]>();


  responsiveOptions = input<CarouselResponsiveOption[]>([
    {
      breakpoint: '1400px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '1024px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 1,
      numScroll: 1
    }
  ]);


  itemActionClicked = output<CarouselItem>();

  onCardAction(item: CarouselItem) {
    this.itemActionClicked.emit(item);
  }
}
