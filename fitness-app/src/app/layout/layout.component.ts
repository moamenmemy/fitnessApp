import { Component } from '@angular/core';
import { NavbarComponent } from "../layout/navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-layout',
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {}
