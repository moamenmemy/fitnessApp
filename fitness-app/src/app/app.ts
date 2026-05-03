import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { ServicesBarComponent } from "./pages/home/components/services-bar/servicesBar.component";
import { WhyUsComponent } from "./pages/home/components/whyUs/whyUs.component";

@Component({
  imports: [ButtonModule, FontAwesomeModule, ServicesBarComponent, WhyUsComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'fitness-app';
    faCoffee = faCoffee;

}
