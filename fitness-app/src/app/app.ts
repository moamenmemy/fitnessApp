import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';


import { NavbarComponent } from './features/navbar/navbar.component';

@Component({
  imports: [ButtonModule, DrawerModule, NavbarComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'fitness-app';
  
        visible2 = false;

}
