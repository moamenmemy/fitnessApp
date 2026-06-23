import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from 'libs/auth/src/lib/interface/Base_url';
import { Observable } from 'rxjs';
import { workotbyid, Workout } from '../../interface/workout';

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
}
