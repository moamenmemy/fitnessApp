import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from 'libs/auth/src/lib/interface/Base_url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Exercises {
  _httpclint = inject(HttpClient);
  _bASEURL = inject(BASE_URL);

  getExercises(): Observable<any> {
    return this._httpclint.get(this._bASEURL+`/api/v1/exercises`);
  }
}
