import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterOutlet } from '@angular/router';


import { Theme } from './core/services/theme/theme';
import { FloatingComponent } from './Shareds/floating-image/floating.component';


@Component({
  imports: [ButtonModule, FontAwesomeModule, RouterOutlet, FloatingComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ["./app.css"],
})
export class App {
  protected title = 'fitness-app';
  private theme = inject(Theme);
}
