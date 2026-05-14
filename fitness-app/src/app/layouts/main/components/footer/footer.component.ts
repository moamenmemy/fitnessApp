import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faPhone,faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  selector: 'app-footer',
  imports: [FontAwesomeModule],
  templateUrl: './footer.component.html',
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent {
  
     icons ={ 
     faPhone : faPhone,
     faEnvelope : faEnvelope
  }
}
