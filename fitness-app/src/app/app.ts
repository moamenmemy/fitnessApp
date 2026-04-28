import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterOutlet } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
@Component({
  imports: [ButtonModule, DrawerModule,  RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'fitness-app';
  
     

}
