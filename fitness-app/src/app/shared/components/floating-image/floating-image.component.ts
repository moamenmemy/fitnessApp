import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-floating-image',
  imports: [],
  templateUrl: './floating-image.component.html',
  styleUrl: './floating-image.component.css',
})
export class FloatingImageComponent {
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
