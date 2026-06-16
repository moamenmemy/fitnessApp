import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ServicesBarComponent } from '../../../../Shared/components/services-bar/servicesBar.component';

@Component({
  standalone: true,
  selector: 'app-footer',
  imports: [FontAwesomeModule, ServicesBarComponent],
  templateUrl: './footer.component.html',
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent {
  icons = {
    faPhone: faPhone,
    faEnvelope: faEnvelope,
  };
}
