import { Component, input } from '@angular/core';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSagittarius } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-button-ui',
  imports: [BadgeModule, OverlayBadgeModule, FontAwesomeModule,RouterLink],
  templateUrl: './buttonUi.component.html',
  styleUrl: './buttonUi.component.css',
})
export class ButtonUiComponent {
    sagittarius=faSagittarius
  route=input<string>('');
  text=input<string>('');
  textcolor=input<string>('');
 backgroundcolor = input<string>('transparent');
}
