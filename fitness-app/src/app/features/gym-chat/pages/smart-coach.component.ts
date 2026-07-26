import {
  Component,
  inject,
  OnInit,
  signal,
  PLATFORM_ID,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { DrawerModule } from 'primeng/drawer';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-smart-coach',
  imports: [FormsModule, NgOptimizedImage, DrawerModule],
  templateUrl: './smart-coach.component.html',
  styleUrl: './smart-coach.component.css',
})
export class SmartCoachComponent implements OnInit {
  private platformId = inject(PLATFORM_ID);


  @ViewChild('chatContainer')
  chatContainer!: ElementRef<HTMLDivElement>;
private http = inject(HttpClient);
  sidebarVisible = false;
  message = '';

  messages = signal([
    {
      role: 'assistant',
      text: 'Hello 👋 How can I help you today with your fitness or nutrition goals?',
    },
  ]);

  loading = signal(false);
  chatHistory = signal<string[]>([]);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const history = JSON.parse(localStorage.getItem('chatHistory') || '[]');
      this.chatHistory.set(history);
    }
  }

  private scrollToBottom() {
    if (!isPlatformBrowser(this.platformId)) return;

    setTimeout(() => {
      if (this.chatContainer) {
        const element = this.chatContainer.nativeElement;

        element.scrollTo({
          top: element.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 100);
  }

  async sendMessage() {
    if (!this.message.trim()) return;

    const userMessage = this.message;

    this.messages.update((m) => [
      ...m,
      {
        role: 'user',
        text: userMessage,
      },
    ]);

    this.scrollToBottom();

    const history = [...this.chatHistory()];
    history.unshift(userMessage);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('chatHistory', JSON.stringify(history));
    }

    this.chatHistory.set(history);

    this.message = '';

    this.loading.set(true);

    this.scrollToBottom();

    try {
      const prompt = `
You are Smart Coach AI.

Only discuss:
- Gym
- Nutrition
- Workout
- Weight loss
- Muscle gain

Conversation:

${this.messages()
  .map((m) => `${m.role}: ${m.text}`)
  .join('\n')}
`;
const result: any = await this.http.post(
  'http://localhost:3000/chat',
  {
    prompt,
  }
).toPromise();

const response = result.response;

      this.loading.set(false);

      this.messages.update((m) => [
        ...m,
        {
          role: 'assistant',
          text: response,
        },
      ]);

      this.scrollToBottom();
    } catch {
      this.loading.set(false);

      this.messages.update((m) => [
        ...m,
        {
          role: 'assistant',
          text: 'Something went wrong.',
        },
      ]);

      this.scrollToBottom();
    }
  }
}