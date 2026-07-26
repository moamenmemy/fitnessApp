export interface ApiCategory {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export interface ApiMeal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}


export interface CarouselItem {
  idMeal: string;
  title: string;
  imageSrc: string;
  subText?: string;
}
export interface MealCategory {
  id: string;
  title: string;
  imageSrc: string;
  text?: string;
}
export interface ApiMealsResponse {
  meals: ApiMeal[] | null;
}


