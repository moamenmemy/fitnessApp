import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterOutlet } from '@angular/router';

import { FloatingImageComponent } from './Shared/components/floating-image/floating-image.component'
import { Theme } from './core/services/theme/theme';


@Component({
  imports: [ButtonModule, FontAwesomeModule, RouterOutlet, FloatingImageComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ["./app.css"],
})
export class App {
  protected title = 'fitness-app';
  private theme = inject(Theme);
}
