import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';



import { RouterOutlet } from "@angular/router";

@Component({
  imports: [ButtonModule, DrawerModule,  RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'fitness-app';
  
     

}
