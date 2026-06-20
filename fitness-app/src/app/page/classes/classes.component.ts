import { Component,  signal } from '@angular/core';
import { CustomCaruselComponent } from '../../Shareds/customCarousel/customCarusel.component';
import { CommonModule } from '@angular/common';
import { CustomCardComponent } from '../../Shareds/customCard/customCard.component';
import { CustomTabsComponent } from "../../Shareds/customTabs/custamTabs.component";
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


    singleMeal = {
    titleName: 'Pasta With Chicken',
    imageCover: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=500&auto=format&fit=cover',
    btnText: 'Explore'


  }


}