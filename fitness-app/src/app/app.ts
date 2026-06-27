import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterOutlet } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LoadingService } from './core/services/loading/loading';
import { CommonModule } from '@angular/common';

@Component({
  imports: [ButtonModule, FontAwesomeModule, RouterOutlet, ProgressSpinnerModule, CommonModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ["./app.css"],
})
export class App {
  protected title = 'fitness-app';
  loadingService = inject(LoadingService);

  isLoading() {
    return this.loadingService.loading();
  }
}