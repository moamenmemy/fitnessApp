import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FloatingComponent } from "../../Shareds/floating-image/floating.component";


@Component({
  standalone: true,
  selector: 'app-main-layouts',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, FloatingComponent],
  templateUrl: './main-layouts.component.html',
  styleUrls: ["./main-layouts.component.css"],
})
export class MainLayoutsComponent {}
