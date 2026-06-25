import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meals } from '../../service/meals/meals';
import { ApiMeal, IMeal } from '../../interface/healthy';
import { TabItem } from '../../../../Shareds/customTabs/interface/customTabs';

import { CustomListComponent } from "../../../../Shareds/custamList/custom-list.component";
import { CustomListItem } from '../../../../Shareds/custamList/interface/custom-list';


@Component({
  selector: 'app-healthy-details',
  imports: [CustomListComponent, ],
  templateUrl: './healthyDetails.component.html',
  styleUrl: './healthyDetails.component.css',
})
export class HealthyDetailsComponent implements OnInit {

categories = signal<TabItem[]>([]); 

  private _activatedRoute = inject(ActivatedRoute);
  private _mealsService = inject(Meals);
isLoadingMeals = signal<boolean>(false)
  meal = signal<IMeal | null>(null);
mealsList = signal<CustomListItem[]>([]);

isLoadingTabs = signal<boolean>(false);
activeTab = signal<string | number>('');

nutritionItems = signal([
  { value: '100 K', label: 'Energy' },
  { value: '15 G', label: 'Protein' },
  { value: '58 G', label: 'Carbs' },
  { value: '20 G', label: 'Fat' }
]);

getMealDetails(id: string) {
  this.isLoadingMeals.set(true);
  this._mealsService.getMealDetails(id).subscribe({
    next: (res) => {
     
      if (res.meals && res.meals.length > 0) {
        this.meal.set(res.meals[0]); 
      }
      this.isLoadingMeals.set(false);
    },
    error: (err) => {
      console.error(err);
      this.isLoadingMeals.set(false);
    }
  });
}

getIngredients(meal: any) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    
    
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({
        ingredient: ingredient,
        measure: measure
      });
    }
  }
  return ingredients;
}

ngOnInit(): void {
  this.loadTabs();

  this._activatedRoute.params.subscribe(params => {
      const mealId = params['id']
      if (mealId) {
        this.getMealDetails(mealId);
      }
    });
}


loadTabs(): void {
  this.isLoadingTabs.set(true);
  this._mealsService.getAllCategories().subscribe({
    next: (res) => {
      this.categories.set(res);
      if (res.length > 0) {
     
        this.activeTab.set(res[0].id);
    
        this.loadMeals(res[0].id.toString());
      }
      this.isLoadingTabs.set(false);
    },
    error: (err) => {
      console.error(err);
      this.isLoadingTabs.set(false);
    }
  });
}



onCategoryChanged(selectedTabId: string | number): void {

  this.activeTab.set(selectedTabId);
  

  this.loadMeals(String(selectedTabId));
}

private loadMeals(categoryName: string): void {
  this.isLoadingMeals.set(true); 

  
  const categoryData = this.categories().find(c => c.strCategory === categoryName);

  this._mealsService.getMealsByCategory(categoryName).subscribe({
    next: (res) => {
      if (res && res.meals) {
       
        const newMeals = res.meals.map((meal: ApiMeal) => ({
          id: meal.idMeal,
          title: meal.strMeal,
          imageUrl: meal.strMealThumb,
          subTitle: categoryData?.strCategoryDescription || 'Healthy Meal',
          description: '',
          hasVideo: false
        }));
        
        this.mealsList.set(newMeals);
      } else {
        this.mealsList.set([]);
      }
      this.isLoadingMeals.set(false);
    },
    error: (err) => {
      console.error('Error loading meals:', err);
      this.mealsList.set([]);
      this.isLoadingMeals.set(false);
    }
  });
}
}


