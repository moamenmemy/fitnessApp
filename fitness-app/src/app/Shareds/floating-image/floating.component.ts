import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-floating',
  imports: [],
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

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }
}
