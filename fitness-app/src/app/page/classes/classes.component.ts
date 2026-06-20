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

mealTabs = [
  { id: 'breakfast', text: 'Breakfast' },
  { id: 'lunch', text: 'Lunch' },
  { id: 'dinner', text: 'Dinner' }
];
}
