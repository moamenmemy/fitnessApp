import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Meals } from './service/meals/meals'; 
import { TabItem } from '../../Shareds/customTabs/interface/customTabs'; 
import { CarouselModule } from 'primeng/carousel'; 

import { CustomTabsComponent } from '../../Shareds/customTabs/custamTabs.component'; 
import { CustomCaruselComponent } from '../../Shareds/customCarousel/customCarusel.component'
import { CarouselItem } from './interface/healthy';
import { SecrionTitleComponent } from "../../Shareds/section-title/secrion-title.component";
import { Router } from '@angular/router';


@Component({
  selector: 'app-healthy',
  standalone: true,
  imports: [
    CommonModule,
    CarouselModule,
    CustomTabsComponent,
    CustomCaruselComponent,
    SecrionTitleComponent
],
  templateUrl: './healthy.component.html',
  styleUrls: ['./healthy.component.css']
})
export class HealthyComponent implements OnInit {
 private mealService = inject(Meals);
  private router = inject(Router);
  mealsList = signal<CarouselItem[]>([]);
  tabs = signal<TabItem[]>([]);
  activeTab = signal<string | number>('');
  
  
  isLoadingTabs = signal<boolean>(false);
  isLoadingMeals = signal<boolean>(false);

  
  chunkedTabs = computed(() => {
    const allTabs = this.tabs();
    const chunkSize = 6;
    const pages: TabItem[][] = [];
    
    for (let i = 0; i < allTabs.length; i += chunkSize) {
      pages.push(allTabs.slice(i, i + chunkSize));
    }
    return pages;
  });

  responsiveOptions = [
    { breakpoint: '1400px', numVisible: 5, numScroll: 1 },
    { breakpoint: '1024px', numVisible: 4, numScroll: 1 },
    { breakpoint: '768px', numVisible: 3, numScroll: 1 },
    { breakpoint: '560px', numVisible: 2, numScroll: 1 }
  ];



 

  loadTabs(): void {
    this.isLoadingTabs.set(true);
    this.mealService.getAllCategories().subscribe({
      next: (mappedTabs) => {

        
        this.tabs.set(mappedTabs);
        if (mappedTabs.length > 0) {
          this.activeTab.set(mappedTabs[0].id);
       
          this.loadMealsByTab(String(mappedTabs[0].id));
        }
        this.isLoadingTabs.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoadingTabs.set(false);
      }
    });

  }



  
onMealSelected(meal: CarouselItem): void { 
  console.log('Navigating to details for ID:', meal.idMeal);
    
 
  if (meal && meal.idMeal) {
    this.router.navigate(['/meal-details', meal.idMeal]);
  }
}

  onTabChange(selectedTabId: string | number): void {
    this.activeTab.set(selectedTabId);
   
    this.loadMealsByTab(String(selectedTabId));
  }

  private loadMealsByTab(categoryName: string): void {
    this.isLoadingMeals.set(true);
    this.mealService.getMealsByCategory(categoryName).subscribe({
      next: (response) => {
        if (response && response.meals) {
       
          const mappedMeals: CarouselItem[] = response.meals.map(meal => ({
            idMeal: meal.idMeal,
            title: meal.strMeal,
            imageSrc: meal.strMealThumb,
            subText: 'Healthy Recipe'
          }));
          this.mealsList.set(mappedMeals);
        } else {
          this.mealsList.set([]);
        }
        this.isLoadingMeals.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoadingMeals.set(false);
      }
    });
  }


 ngOnInit(): void {
    this.loadTabs();
  }



}