import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiCategory,ApiMealsResponse, IMealResponse} from '../../interface/healthy';
import { TabItem } from '../../../../Shareds/customTabs/interface/customTabs';


@Injectable({
  providedIn: 'root',
})
export class Meals {
  getAllMeals() {
    throw new Error('Method not implemented.');
  }
  private http = inject(HttpClient);
  private baseUrl = 'https://www.themealdb.com/api/json/v1/1';

  
  getMealsByCategory(categoryName: string): Observable<ApiMealsResponse> {
    return this.http.get<ApiMealsResponse>(`${this.baseUrl}/filter.php?c=${categoryName}`);
  }

  
 getAllCategories(): Observable<TabItem[]> {
  return this.http.get<{ categories: ApiCategory[] }>(`${this.baseUrl}/categories.php`).pipe(
    map(response => {
      return (response.categories || []).map(cat => ({
        id: cat.strCategory, 
        text: cat.strCategory,
        strCategory: cat.strCategory,
        strCategoryThumb: cat.strCategoryThumb,
        strCategoryDescription: cat.strCategoryDescription 
      }));
    })
  );
}

getMealDetails(id: string): Observable<IMealResponse> { // حدد النوع هنا
  return this.http.get<IMealResponse>(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
}
}
  