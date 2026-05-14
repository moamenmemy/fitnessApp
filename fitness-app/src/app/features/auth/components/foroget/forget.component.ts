import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { CustomInputComponent } from "../../../../Shared/components/customInput/customInput.component";
import { InputOtpModule } from 'primeng/inputotp';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-forget',
  imports: [CommonModule, IconFieldModule, InputIconModule, InputTextModule, CustomInputComponent, InputOtpModule, FormsModule],
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css'],
})
export class ForgetComponent {
  stap = 1;
    value: any;

}
