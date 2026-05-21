import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
@Component({
  standalone: true,
  selector: 'app-auth-layouts',
  imports: [RouterOutlet, NgOptimizedImage],
  templateUrl: './auth-layouts.component.html',
  styleUrls: ["./auth-layouts.component.css"],
})
export class AuthLayoutsComponent {}
