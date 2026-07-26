import { signal } from '@angular/core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loadingCount = 0;
  loading = signal<boolean>(false);

  show(): void {
    this._loadingCount++;
    this.loading.set(true);
  }

  hide(): void {
    this._loadingCount--;
    if (this._loadingCount <= 0) {
      this._loadingCount = 0;
      this.loading.set(false);
    }
  }

  isLoading(): boolean {
    return this.loading();
  }
}