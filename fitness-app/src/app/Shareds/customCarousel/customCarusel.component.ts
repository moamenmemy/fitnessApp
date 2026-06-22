import { Component, computed, input, output } from '@angular/core';
import { CarouselItem, CarouselResponsiveOption } from './interface/customCarusel';
import { CarouselModule } from 'primeng/carousel'; 
import { CommonModule } from '@angular/common';
import { CustomCardComponent } from '../customCard/customCard.component';

@Component({
  selector: 'app-custom-carusel',
  standalone: true,
  imports: [CommonModule, CarouselModule, CustomCardComponent],
  templateUrl: './customCarusel.component.html',
  styleUrl: './customCarusel.component.css',
})
export class CustomCaruselComponent {
  carouselItems = input.required<CarouselItem[]>();
  
 
  rowsCount = input<number>(1);

  
groupedItems = computed<CarouselItem[][]>(() => {
  const items = this.carouselItems();
  const rows = this.rowsCount();
  const result: CarouselItem[][] = [];
  
  for (let i = 0; i < items.length; i += rows) {
    result.push(items.slice(i, i + rows));
  }
  return result;
});

  responsiveOptions = input<CarouselResponsiveOption[]>([
    { breakpoint: '1400px', numVisible: 3, numScroll: 1 },
    { breakpoint: '1024px', numVisible: 2, numScroll: 1 },
    { breakpoint: '768px', numVisible: 1, numScroll: 1 },
    { breakpoint: '480px', numVisible: 1, numScroll: 1 }
  ]);

  itemActionClicked = output<CarouselItem>();

  onCardAction(item: CarouselItem): void {
    this.itemActionClicked.emit(item);
  }
}