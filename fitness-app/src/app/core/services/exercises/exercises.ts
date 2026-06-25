import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from 'libs/auth/src/lib/interface/Base_url';

import { DifficultyLevelsResponse, workotbyid, Workout } from '../../interface/workout';

@Injectable({
  providedIn: 'root',
})
export class Exercises {
  _httpclint = inject(HttpClient);
  _bASEURL = inject(BASE_URL);


  getExercises(): Observable<any> {
    return this._httpclint.get(this._bASEURL+`/api/v1/exercises`);
  }
 
  getMuscleGroups(): Observable<Workout> {
    return this._httpclint.get<Workout>(this._bASEURL+`/api/v1/muscles`);
  }

  getMuscleGroupsById(id: string): Observable<workotbyid> {
    return this._httpclint.get<workotbyid>(this._bASEURL+`/api/v1/musclesGroup/${id}`);
  }
  GetAllDifficultyLevels(id: string): Observable<DifficultyLevelsResponse> {
    return this._httpclint.get<DifficultyLevelsResponse>(this._bASEURL+`/api/v1/levels/difficulty-levels/by-prime-mover?primeMoverMuscleId=${id}`);
  }
  GetExercisesByPrime(idmusck:string,idlevel:string):Observable<any>{
    return this._httpclint.get<any>(this._bASEURL+`/api/v1/exercises/prime-mover?primeMoverMuscleId=${idmusck}&difficultyLevelId=${idlevel}`);

  }
  getmeals():Observable<any>{
     return this._httpclint.get(`https://www.themealdb.com/api/json/v1/1/categories.php`);
  }
}
