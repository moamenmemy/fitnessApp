import { Component, input } from '@angular/core';

@Component({
  selector: 'app-text',
  imports: [],
  templateUrl: './text.component.html',
  styleUrl: './text.component.css',
})
export class TextComponent {
  title = input<string>();
  paragraph = input<string>('This Helps Us Create Your Personalized Plan');
}
