import { Component,  signal } from '@angular/core';
import { CustomCaruselComponent } from '../../Shareds/customCarousel/customCarusel.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-classes',
  imports: [CommonModule, CustomCaruselComponent],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css',
})
export class ClassesComponent  {
  testMeals = signal([
    { title: 'Pasta With Chicken', subText: 'Explore', imageSrc: 'assets/logo.png' },
    { title: 'Healthy Salad', subText: 'Explore', imageSrc: 'assets/logo.png' },
    { title: 'Oatmeal Honey', subText: 'Explore', imageSrc: 'assets/logo.png' },
    { title: 'Grilled Fish', subText: 'Explore', imageSrc: 'assets/logo.png' }
  ]);



  
  handleCarouselClick(item: any) {
    console.log('تم الضغط على العنصر جوه الكاروسيل:', item);
  }
}
