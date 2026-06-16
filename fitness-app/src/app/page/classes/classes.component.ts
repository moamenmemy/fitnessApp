import { Component } from '@angular/core';
import { CustomCardComponent } from '../../Shareds/customCard/customCard.component';
import { CustomTabsComponent } from "../../Shareds/customTabs/custamTabs.component";

@Component({
  selector: 'app-classes',
  imports: [CustomCardComponent, CustomTabsComponent],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.css',
})
export class ClassesComponent {
    singleMeal = {
    titleName: 'Pasta With Chicken',
    imageCover: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=500&auto=format&fit=cover',
    btnText: 'Explore'
  };

  
  onFoodTabChange(category: any) {
    console.log('التاب اللي ضغطت عليه حالياً هو:', category);
    
    // هنا مستقبلاً هتعمل الـ API Call بتاعك بناءً على الـ category اللي راجع
    // مثلاً لو راجع نص صريح: Breakfast أو أوبجكت كامل
  }
}
