import { Component } from '@angular/core';

import { RouterLink } from "@angular/router";

import { MainButtonComponent } from '../../../../shared/components/main-button/mainButton.component';


@Component({
  selector: 'app-login',
  imports: [MainButtonComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {}
