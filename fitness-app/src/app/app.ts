import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterOutlet } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
@Component({
  standalone: true,
  imports: [ButtonModule, DrawerModule,  RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ["./app.css"],
})
export class App {
  protected title = 'fitness-app';
  
     

}
