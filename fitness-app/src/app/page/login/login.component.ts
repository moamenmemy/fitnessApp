import { Component } from '@angular/core';
import { MainButtonComponent } from '../../Shared/components/main-button/mainButton.component';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [MainButtonComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {}
