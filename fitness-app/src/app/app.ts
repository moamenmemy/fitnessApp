import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { RouterOutlet } from '@angular/router';


@Component({
  imports: [ButtonModule, FontAwesomeModule, RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'fitness-app';
    faCoffee = faCoffee;

}
