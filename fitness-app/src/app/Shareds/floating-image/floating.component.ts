import { Component, HostListener } from '@angular/core';
import { SmartCoachComponent } from '../../features/gym-chat/pages/smart-coach.component';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-floating',
  imports: [SmartCoachComponent, DialogModule],
  templateUrl: './floating.component.html',
  styleUrl: './floating.component.css',
})
export class FloatingComponent {
    isVisible = false;
  isChatOpen = false;

  @HostListener('window:scroll')
  onScroll() {
    this.isVisible = window.scrollY > 300;
  }
 visible = false;

  toggleChat() {
    this.visible = !this.visible;
  }

}
