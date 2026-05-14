import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-auth-layouts',
  imports: [RouterOutlet],
  templateUrl: './auth-layouts.component.html',
  styleUrls: ["./auth-layouts.component.css"],
})
export class AuthLayoutsComponent {}
