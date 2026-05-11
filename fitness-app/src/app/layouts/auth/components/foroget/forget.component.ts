import { Component } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { CustomInputComponent } from "../../../../shared/components/customInput/customInput.component";
import { InputOtpModule } from 'primeng/inputotp';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forget',
   imports: [IconFieldModule, InputIconModule, InputTextModule, CustomInputComponent,InputOtpModule,FormsModule],
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.css',
})
export class ForgetComponent {
  stap = 3;
    value: any;

}
