import { Component, computed, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { Theme } from '../../core/services/theme/theme';
interface SettingCard {
  id: string;
  title: string;
  icon: string;
  subTitle?: string;
  type?: 'switch' | 'button' | 'logout';
}
@Component({
  selector: 'app-userprofile',
  imports: [NgOptimizedImage, FontAwesomeModule, FormsModule, ToggleSwitchModule],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css',
})
export class UserprofileComponent {
  rotate = faArrowsRotate;
theme = inject(Theme);

  isDarkMode = computed(() => this.theme.theme() === 'dark');
 onThemeToggle(checked: boolean) {
    this.theme.setTheme(checked ? 'dark' : 'light');
  }
  infos = [
    {
      title: 'your Goal',
      text: 'TAP TO CHANGE',
      lable: 'Change Goal',
    },
    {
      title: 'level',
      text: 'TAP TO CHANGE',
      lable: 'Change Goal',
    },
    {
      title: 'weight',
      text: 'TAP TO CHANGE',
      lable: 'Change Goal',
    },
  ];

  // مصفوفة البيانات الخاصة بالكروت
  settingsCards: SettingCard[] = [
    { id: 'password', title: 'Change Password', icon: 'pi pi-refresh' },
    { id: 'language', title: 'Select Language', subTitle: 'English', icon: 'pi pi-globe' },
    { id: 'mood', title: 'Mood', subTitle: 'Dark', icon: 'pi pi-moon', type: 'switch' },
    { id: 'security', title: 'Security', icon: 'pi pi-shield' },
    { id: 'privacy', title: 'Privacy Policy', icon: 'pi pi-lock' },
    { id: 'help', title: 'Help', icon: 'pi pi-question-circle' },
    { id: 'logout', title: 'Logout', icon: 'pi pi-sign-out', type: 'logout' }
  ];

  onCardClick(cardId: string) {
    if (cardId === 'logout') {
      console.log('Logging out...');
    } else {
      console.log('Card clicked:', cardId);
    }
  }
}
