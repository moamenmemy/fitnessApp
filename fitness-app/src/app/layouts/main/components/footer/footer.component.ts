import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ServicesBarComponent } from 'fitness-app/src/app/shared/components/services-bar/servicesBar.component';

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule, ServicesBarComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  icons = {
    faPhone: faPhone,
    faEnvelope: faEnvelope,
  };
}
