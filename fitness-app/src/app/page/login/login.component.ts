import { Component } from '@angular/core';
import { MainButtonComponent } from '../../shared/components/main-button/mainButton.component';

@Component({
  selector: 'app-login',
  imports: [MainButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {}
