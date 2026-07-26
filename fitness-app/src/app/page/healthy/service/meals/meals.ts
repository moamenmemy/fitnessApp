import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiCategory,ApiMealsResponse} from '../../interface/healthy';
import { TabItem } from '../../../../Shareds/customTabs/interface/customTabs';


@Injectable({
  providedIn: 'root',
})
export class Meals {
  private http = inject(HttpClient);
  private baseUrl = 'https://www.themealdb.com/api/json/v1/1';

  
  getMealsByCategory(categoryName: string): Observable<ApiMealsResponse> {
    return this.http.get<ApiMealsResponse>(`${this.baseUrl}/filter.php?c=${categoryName}`);
  }

  
  getAllCategories(): Observable<TabItem[]> {
    return this.http.get<{ categories: ApiCategory[] }>(`${`${this.baseUrl}/categories.php`}`).pipe(
      map(response => {
        const categoriesArray = response.categories || [];
        return categoriesArray.map(cat => ({
          id: cat.strCategory,
          text: cat.strCategory,
          imageSrc: cat.strCategoryThumb,
          title: cat.strCategory,
        }));
      })
    );
  }
}
  